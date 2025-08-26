'use client';
import React, { useState, Suspense, useLayoutEffect } from 'react';
import ProfileImage from '@/components/common/ProfileImage';
import GoogleMap from '@/components/googleMap/GoogleMap';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import UserMarker from '@/components/googleMap/UserMarker';
import { useStomp } from '@/hooks/useStomp';
import type { MemberData } from '@/types/crew';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
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
          onClick={() => onClick(user)}
          isRunning={true}
          profileImageUrl={'/assets/clover.png'}
          alt="user"
        />
      ))}
    </div>
  );
}

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

  const [memberData, setMemberData] = useState({
    lat: 35.97664845766847,
    lng: 126.99597295767953
  });

  //TODO 멤버 타입 정의
  const onMemberClick = (member: MemberData) => {
    // const {langtitude, longitude, isRunning=true} = member;
    setMemberData({
      lng: 126.8542609,
      lat: 37.5615603
    });
  };

  // const { connected, publish } = useStomp({
  //   url: process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/ws',
  //   subscribeUrl: '/topic/group-running',
  //   publishUrl: '/app/group-running',
  //   onMessage: message => {
  //     const data = JSON.parse(message);
  //     setMemberData({
  //       lat: data.lat,
  //       lng: data.lng
  //     });
  //   }
  // });

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
            'X-USER-ID': '1',
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('users', users);
      // ... existing code ...
    };
    init();
  });

  return (
    <div className="text-whit relative h-screen w-full overflow-scroll bg-[#313131] px-4">
      <CrewMemberProfiles
        users={[
          {
            memberId: '1',
            nickname: '유준호',
            character: 'clover'
          },
          {
            memberId: '2',
            nickname: '김철수',
            character: 'clover'
          },
          {
            memberId: '3',
            nickname: '이영희',
            character: 'clover'
          }
        ]}
        onClick={onMemberClick}
      />
      <div className="relative mt-6 mb-[14px] h-[400px] overflow-y-scroll">
        <GoogleMap path={[{ lat: memberData.lat, lng: memberData.lng }]}>
          <UserMarker
            lat={memberData.lat}
            lng={memberData.lng}
            imageUrl={'/assets/clover.png'}
          />
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
