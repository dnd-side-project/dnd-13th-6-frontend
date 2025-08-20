import React from 'react';
import Image from 'next/image';
import { Bell } from '@phosphor-icons/react';

const MainHeader = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <Image
        src={'/assets/LogoWithText.png'}
        alt={'logo'}
        width={92}
        height={29}
      />
      <div className="relative">
        <Bell width={24} height={24} color={'white'} />
        {/* 빨간 점 */}
        <div className="absolute top-1 right-0 h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF3B30]" />
      </div>
    </div>
  );
};

export default MainHeader;
