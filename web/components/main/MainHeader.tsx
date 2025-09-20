'use client';
import React from 'react';
import Image from 'next/image';
import { Bell, GearSix } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { Notification } from '@/types/notification';

const MainHeader = ({ notification }: { notification: Notification[] }) => {
  const router = useRouter();
  const hasUnread = notification.some(n => !n.read);
  console.log('after', notification);
  console.log('hasUnread', hasUnread);
  return (
    <div className="flex w-full items-center justify-between pt-4">
      <Image src={'/assets/LOGO.svg'} alt={'logo'} width={92} height={29} />
      <div>
        <button
          className="mr-3"
          onClick={() => {
            router.push('/settings');
          }}
        >
          <GearSix size={24} color="white" />
        </button>
        <button
          className="relative"
          onClick={() => {
            router.push('/notification');
          }}
        >
          <Bell width={24} height={24} color="white" />
          {/* 빨간 점 */}
          {hasUnread && (
            <div className="absolute top-1 right-0 h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF3B30]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
