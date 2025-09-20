'use client';
import React, { useState, Suspense, useEffect, useMemo } from 'react';
import ProfileImage from '@/components/common/ProfileImage';
import GoogleMap from '@/components/googleMap/GoogleMap';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import UserMarker from '@/components/googleMap/UserMarker';
import type { MemberData } from '@/types/crew';
import { useSearchParams } from 'next/navigation';
import { Client } from '@stomp/stompjs';
import api from '@/utils/apis/customAxios';
import { postCheerfulMessage } from '@/utils/apis/running';
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
    //런닝 아이디가 있을 경우에만 클로버 보내기
    if (runningId && !isNaN(Number(runningId))) {
      postCheerfulMessage({
        runningId,
        memberId: member?.memberId,
        emojiType
      });
    }
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
  // 브라우저 환경 체크
  const isBrowser = typeof window !== 'undefined';
  // 안전한 localStorage 접근
  const getAccessToken = useMemo(() => {
    if (!isBrowser) return '';
    return localStorage.getItem('accessToken') || '';
  }, [isBrowser]);
  const searchParams = useSearchParams();
  const crewId = searchParams.get('q');
  const [stompClient] = useState(() => {
    return new Client({
      webSocketFactory: () => new WebSocket('wss://api.runky.store/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        Authorization: `Bearer ${getAccessToken}`
      }
    });
  });
  const [members, setMembers] = useState<MemberData[]>([]);
  const [member, setMember] = useState<MemberData | null>(null);
  const [memberLocation, setMemberLocation] = useState<
    {
      lat: number;
      lng: number;
    }[]
  >([]);

  const leastMemberLocation = useMemo(() => {
    return memberLocation.at(-1);
  }, [memberLocation]);

  const onMemberClick = (member: MemberData) => {
    setMember(member);
    if (!member.isRunning || !isBrowser) return;
    console.log(stompClient, stompClient.connected);
    if (stompClient && stompClient.connected) {
      const subscribeUrl = member.sub;
      console.log(member.sub);
      stompClient.subscribe(
        subscribeUrl,
        message => {
          try {
            const data = JSON.parse(message.body);
            setMemberLocation(prev => [
              ...prev,
              {
                lat: data.message.latitude,
                lng: data.message.longitude
              }
            ]);
          } catch (error) {}
        },
        {
          'content-type': 'application/json'
        }
      );
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

    document.addEventListener('message', handleAndroidMessage);
    window.addEventListener('message', handleIOSMessage);

    return () => {
      document.removeEventListener('message', handleAndroidMessage);
      window.removeEventListener('message', handleIOSMessage);
    };
  }, [isBrowser, getAccessToken]); // 의존성 추가

  useEffect(() => {
    const init = async () => {
      if (!crewId) return;
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/crews/${crewId}/members`
      );
      setMembers(response.data.result.members);
      stompClient.activate();
    };
    init();
    return () => {
      stompClient.deactivate();
      setMemberLocation([]);
      setMember(null);
    };
  }, [crewId]);

  return (
    <div className="relative -mt-6 w-full overflow-hidden bg-[#313131] px-4 text-white">
      {members && (
        <CrewMemberProfiles users={members} onClick={onMemberClick} />
      )}
      <div className="mt-6 mb-[14px] min-h-[400px]">
        <GoogleMap height="750px" path={memberLocation}>
          {member && memberLocation && leastMemberLocation && (
            <>
              <UserMarker
                lat={leastMemberLocation.lat}
                lng={leastMemberLocation.lng}
                imageUrl={member.badgeImageUrl}
              />
              <SendCloverButton member={member} />
            </>
          )}
        </GoogleMap>
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
