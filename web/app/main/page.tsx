'use client';
import React from 'react';
import Image from 'next/image';
import { Bell } from '@phosphor-icons/react';

export default function Main() {
  return (
    <div>
      <div className="flex w-full items-center justify-between px-4 py-2">
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
        {/*카드 */}
      </div>
      <div className="width-full bg-">카드</div>
    </div>
  );
}
