'use client';
import React, { useRef, useState } from 'react';
import ProfileImage from '@/components/common/ProfileImage';
import GoogleMap from '@/components/GoogleMap/GoogleMap';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import UserMarker from '@/components/GoogleMap/UserMarker';
function CrewMemberProfiles({users, onClick}: {users:Array<any>, onClick: (user:any) => void}) {
  return (
    <div className="flex justify-evenly overflow-x-scroll">
      {users.map((user, index) => (
        <ProfileImage
          key={index}
          onClick={() => onClick(user)}
          isRunning={true}
          profileImageUrl={'/assets/clover.png'}
          alt='user'
        />
      ))}
    </div>
  )
}

export default function Page() {
    const [clovers, setClovers] = useState<{ id: number; x: number }[]>([]);

  const handleClick = () => {
    const id = Date.now();
    const randomX = (Math.random()) * 60; // 버튼 기준 좌우 살짝 흔들림
    setClovers((prev) => [...prev, { id, x: randomX }]);

    setTimeout(() => {
      setClovers((prev) => prev.filter((c) => c.id !== id));
    }, 2000);
  };
  const [memberData, setMemberData] = useState({
    lat: 35.97664845766847,
    lng: 126.99597295767953
  });
  //todo:테스트용

  //TODO 멤버 타입 정의
  const onMemberClick = (member?: {
    langtitude: number,
    lngitude: number,
    isRunning: boolean
  }) => {
    // const {langtitude, longitude, isRunning=true} = member;
    setMemberData({
      lng:  126.8542609,
      lat: 37.5615603
    })
  }

  return (
    <div
      className="relative h-screen w-full bg-[#313131] text-whit px-4 pt-10 overflow-scroll"
    >
      <CrewMemberProfiles users={[1,2,3,4,5]} onClick={onMemberClick} />
      <div className="mt-8 overflow-y-scroll h-[400px]">
        <GoogleMap path={[{lat:memberData.lat, lng: memberData.lng}]}>
          <UserMarker
            lat={memberData.lat}
            lng={memberData.lng}
            imageUrl={'/assets/clover.png'}
          />
        </GoogleMap>
      </div>

      <button
        onClick={handleClick}
        className=" px-4 py-2 rounded-full bg-gray-80 ml-auto text-white flex items-center gap-2 mt-[14px]"
      >
        {/* 🌿 클로버 아이콘 컨테이너 */}
        <div className="relative w-5 h-5 max-h-15">
          <Image src="/assets/clover.png" alt="clover" fill />

          {/* 클릭 시 생성되는 클로버 애니메이션 */}
          {/* 처음에는 흐리게* */}
          <div className="absolute left-2 top-0 w-5 h-5 pointer-events-none">
            <AnimatePresence>
              {clovers.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ y: 0, scale: 3, opacity: 0.3,  }}
                  animate={{
                    y: -50, // 위로 이동
                    scale: 7,    
                    opacity: 1,
                    //오른쪽으로 기울어짐
                    rotate: 45
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-1/2 top-0 -translate-x-1/2"
                >
                  <Image src="/assets/clover-142.png" alt="clover" width={142} height={142} />
                </motion.div>
              ))}
            </AnimatePresence>
            </div>
          </div>
        행운 보내기
      </button>
    </div>
  );
}
