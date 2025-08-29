'use client';
import React, { useState, Suspense, useLayoutEffect, useEffect } from 'react';
import ProfileImage from '@/components/common/ProfileImage';
import GoogleMap from '@/components/googleMap/GoogleMap';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import UserMarker from '@/components/googleMap/UserMarker';
import type { MemberData } from '@/types/crew';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
function CrewMemberProfiles({
  users,
  onClick
}: {
  users: Array<MemberData>;
  onClick: (user: MemberData) => void;
}) {
  return (
    <div className="mt-6 flex gap-4 overflow-x-scroll">
      {users.map((user, index) => (
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

const stompClient = new Client({
  webSocketFactory: () =>
    new SockJS(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/ws`),
  reconnectDelay: 5000
});

function GroupRunningContent() {
  const [clovers, setClovers] = useState<{ id: number; x: number }[]>([]);
  const searchParams = useSearchParams();
  const crewId = searchParams.get('q');

  //TODO 크루 ID를 통해 크루 조회

  // 클로버 애니메이션
  const startCloverAnimation = () => {
    const id = Date.now();
    const randomX = Math.random() * 60; // 버튼 기준 좌우 살짝 흔들림
    setClovers(prev => [...prev, { id, x: randomX }]);

    setTimeout(() => {
      setClovers(prev => prev.filter(c => c.id !== id));
    }, 2000);
  };
  const [members, setMembers] = useState<MemberData[]>([]);
  const [member, setMember] = useState<MemberData | null>(null);
  const [memberLocation, setMemberLocation] = useState({
    lat: 35.97664845766847,
    lng: 126.99597295767953
  });

  //TODO 멤버 타입 정의
  const onMemberClick = (member: MemberData) => {
    setMember(member);

    stompClient.subscribe(member.sub, (message: IMessage) => {
      const data: {
        x: number;
        y: number;
        timestamp: number;
      } = JSON.parse(message.body);
      setMemberLocation({
        lng: data.x,
        lat: data.y
      });
    });
  };

  useEffect(() => {
    // Android
    const handleAndroidMessage = (event: Event) => {
      try {
        const messageEvent = event as MessageEvent;
        const parsedData = JSON.parse(messageEvent.data);
        console.log('Android received message:', parsedData);
        if (parsedData.type === 'SET_CREW_MEMBERS') {
          setMembers(parsedData.message as MemberData[]);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    // iOS
    const handleIOSMessage = (event: MessageEvent) => {
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
      stompClient.deactivate();
    };
  }, []);

  const sendEmogi = (emojiType: string) => {
    startCloverAnimation();
    // publish(emojiType);
  };

  useLayoutEffect(() => {
    const init = async () => {
      const users = axios(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/crews/${crewId}/members`,
        {
          method: 'GET',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // ... existing code ...
    };
    init();
  });

  return (
    <div className="text-whit relative h-screen w-full overflow-scroll bg-[#313131] px-4">
      <CrewMemberProfiles users={members} onClick={onMemberClick} />
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
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <GroupRunningContent />
    </Suspense>
  );
}
