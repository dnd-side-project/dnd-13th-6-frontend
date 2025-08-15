'use client';
import React, { useRef, useState } from 'react';
import ProfileImage from '@/components/common/ProfileImage';
import GoogleMap from '@/components/GoogleMap/GoogleMap';
export default function Page() {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipeActive = useRef(false);
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
      className="relative h-screen w-full overflow-hidden bg-[#313131] text-whit px-4 pt-10"
    >
      <div className="flex gap-4 min-w-full overflow-auto justify-center">
        <ProfileImage onClick={onMemberClick} isRunning={true} profileImageUrl="https://picsum.photos/200/300" width={60} height={60} alt='user'  />
        <ProfileImage onClick={onMemberClick} profileImageUrl="https://picsum.photos/60" width={60} height={60} alt='user'  />
        <ProfileImage onClick={onMemberClick} profileImageUrl="https://picsum.photos/200/300" width={60} height={60} alt='user'  />
        <ProfileImage onClick={onMemberClick} profileImageUrl="https://picsum.photos/200/300" width={60} height={60} alt='user'  />
        <ProfileImage onClick={onMemberClick} profileImageUrl="https://picsum.photos/200/300" width={60} height={60} alt='user'  />
      </div>
      <div className="mt-8 h-full">
        <GoogleMap path={[{lat:memberData.lat, lng: memberData.lng}]} />
      </div>
    </div>
  );
}
