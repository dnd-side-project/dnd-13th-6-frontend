'use client';
import React, { useState, Suspense, useEffect, useCallback } from 'react';
import ProfileImage from '@/components/common/ProfileImage';
import GoogleMap from '@/components/googleMap/GoogleMap';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import UserMarker from '@/components/googleMap/UserMarker';
import type { MemberData } from '@/types/crew';
import { useSearchParams } from 'next/navigation';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import api from '@/utils/apis/customAxios';
function CrewMemberProfiles({
  users,
  onClick
}: {
  users: Array<MemberData>;
  onClick: (user: MemberData) => void;
}) {
  return (
    <div className="mt-6 flex gap-4 overflow-x-scroll">
      {users &&
        users.map((user, index) => (
          <ProfileImage
            key={index}
            onClick={() => {
              if (user.isRunning) {
                onClick(user);
              }
            }}
            isRunning={user.isRunning}
            profileImageUrl={user.badgeImageUrl}
            alt="user"
          />
        ))}
    </div>
  );
}

const SendCloverButton = ({ member }: { member: MemberData }) => {
  const [clovers, setClovers] = useState<{ id: number; x: number }[]>([]);

  // 클로버 애니메이션
  const startCloverAnimation = () => {
    const id = Date.now();
    const randomX = Math.random() * 60; // 버튼 기준 좌우 살짝 흔들림
    setClovers(prev => [...prev, { id, x: randomX }]);

    setTimeout(() => {
      setClovers(prev => prev.filter(c => c.id !== id));
    }, 2000);
  };

  const sendEmogi = (emojiType: string) => {
    if (!member?.isRunning) {
      return;
    }
    startCloverAnimation();
    const runningId = member?.sub.split('/').at(-1);
    api.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/runnings/${runningId}/cheers`,
      {
        receiverId: member?.memberId,
        message: emojiType
      }
    );
  };
  return (
    <button
      onClick={() => sendEmogi('clover')}
      className="absolute right-2 bottom-2 z-10 ml-auto flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white"
    >
      <div className="relative h-5 max-h-15 w-5">
        <Image src="/assets/clover.png" alt="clover" fill />

        {/* 클릭 시 생성되는 클로버 애니메이션 */}
        {/* 처음에는 흐리게* */}
        <div className="pointer-events-none absolute top-0 left-2 h-5 w-5">
          <AnimatePresence>
            {clovers.map(c => (
              <motion.div
                key={c.id}
                initial={{ y: 0, scale: 3, opacity: 0.3 }}
                animate={{
                  y: -100, // 위로 이동
                  x: 50,
                  scale: 12,
                  opacity: 1,
                  //오른쪽으로 기울어짐
                  rotate: 45
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <Image
                  src="/assets/clover-142.png"
                  alt="clover"
                  width={142}
                  height={142}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div>행운 보내기</div>
    </button>
  );
};

function GroupRunningContent() {
  const searchParams = useSearchParams();
  const crewId = searchParams.get('q');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [members, setMembers] = useState<MemberData[]>([]);
  const [member, setMember] = useState<MemberData | null>(null);
  const [memberLocation, setMemberLocation] = useState({
    lat: 35.97664845766847,
    lng: 126.99597295767953
  });

  // 브라우저 환경 체크
  const isBrowser = typeof window !== 'undefined';

  // 안전한 localStorage 접근
  const getAccessToken = useCallback(() => {
    if (!isBrowser) return '';
    return localStorage.getItem('accessToken') || '';
  }, [isBrowser]);

  const onMemberClick = (member: MemberData) => {
    setMember(member);

    if (!member.isRunning || !isBrowser) {
      return;
    }

    if (stompClient && stompClient.connected) {
      // 올바른 subscribe URL 사용 (서버 로그와 일치)
      const subscribeUrl = member.sub; // 이미 "/topic/runnings/58" 형태

      stompClient.subscribe(
        subscribeUrl,
        (message: IMessage) => {
          console.log('✅ 그룹 러닝 메시지 수신 성공:', message.body);
          try {
            const data: {
              x: number;
              y: number;
              timestamp: number;
            } = JSON.parse(message.body);
            console.log('📍 파싱된 위치 데이터:', data);

            setMemberLocation({
              lng: data.x,
              lat: data.y
            });
            console.log('🗺️ 업데이트된 멤버 위치:', {
              lng: data.x,
              lat: data.y
            });
          } catch (parseError) {
            console.error('❌ 그룹 러닝 메시지 파싱 실패:', parseError);
          }
        },
        {
          'content-type': 'application/json',
          Authorization: `Bearer ${getAccessToken()}`
        }
      );
    } else {
      console.log('❌ STOMP 클라이언트가 연결되지 않았거나 존재하지 않음');
      console.log('STOMP 클라이언트 상태:', stompClient?.connected);
    }
  };
  useEffect(() => {
    // 브라우저 환경이 아니면 실행하지 않음
    if (!isBrowser) return;

    // Android
    const handleAndroidMessage = (event: Event) => {
      try {
        const messageEvent = event as MessageEvent;
        const parsedData = JSON.parse(messageEvent.data);
        console.log('parsedData', parsedData);
        if (parsedData.type === 'SET_CREW_MEMBERS') {
          setMembers(parsedData.message as MemberData[]);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    // iOS
    const handleIOSMessage = (event: MessageEvent) => {
      console.log('event', event);
      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === 'SET_CREW_MEMBERS') {
          setMembers(parsedData.message as MemberData[]);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    // STOMP 클라이언트 생성
    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: str => {
        console.log('🔧 STOMP DEBUG:', str);
      },
      onConnect: () => {
        console.log('🔌 그룹 러닝 STOMP 연결 성공');
        console.log(
          '🆔 Access Token:',
          getAccessToken()?.substring(0, 20) + '...'
        );
      },
      onDisconnect: () => {
        console.log('❌ 그룹 러닝 STOMP 연결 해제');
      },
      onStompError: frame => {
        console.error('❌ 그룹 러닝 STOMP 에러:', frame);
      },
      connectHeaders: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    });

    setStompClient(client);

    document.addEventListener('message', handleAndroidMessage);
    window.addEventListener('message', handleIOSMessage);

    client.activate();

    return () => {
      document.removeEventListener('message', handleAndroidMessage);
      window.removeEventListener('message', handleIOSMessage);
      client.deactivate();
    };
  }, [isBrowser, getAccessToken]); // 의존성 추가

  useEffect(() => {
    const init = async () => {
      if (!crewId) return;
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/crews/${crewId}/members`
      );
      setMembers(response.data.result.members);
    };
    init();
  }, [crewId]);

  return (
    <div className="relative -mt-6 h-[500px] w-full bg-[#313131] px-4 text-white">
      {members && (
        <CrewMemberProfiles users={members} onClick={onMemberClick} />
      )}
      <div className="relative mt-6 mb-[14px] h-[400px] overflow-y-scroll">
        <GoogleMap
          path={[{ lat: memberLocation.lat, lng: memberLocation.lng }]}
        >
          {member && (
            <UserMarker
              lat={memberLocation.lat}
              lng={memberLocation.lng}
              imageUrl={member.badgeImageUrl}
            />
          )}
        </GoogleMap>
        {member && <SendCloverButton member={member} />}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GroupRunningContent />
    </Suspense>
  );
}
