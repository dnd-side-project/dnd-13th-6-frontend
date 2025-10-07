'use client';
import React from 'react';
import { ChatTeardropDots, Clover, FlagPennant } from '@phosphor-icons/react';
import NotificationCard from '@/components/notification/NotificationCard';
import { useNotifications } from '@/hooks/notification/useNotifications';

const flagPennantIcon = <FlagPennant size={20} color={'#F2F2F7'} />;

const IconMap = {
  CHEER: <Clover size={20} color={'#F2F2F7'} />,
  PERSONAL_GOAL_ACHIEVED: flagPennantIcon,
  PERSONAL_GOAL_FAILED: flagPennantIcon,
  CREW_GOAL_ACHIEVED: flagPennantIcon,
  CREW_GOAL_FAILED: flagPennantIcon,
  CREW_DISBANDED: <ChatTeardropDots size={20} color={'#F2F2F7'} />,
  RUN_STARTED: flagPennantIcon,
};

type IconCode = keyof typeof IconMap;

// 시간 차이를 상대 시간으로 변환
const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = now.getTime() - past.getTime(); // ms
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diff < hour) return `${Math.floor(diff / minute)}분전`;
  if (diff < day) return `${Math.floor(diff / hour)}시간전`;
  if (diff < week) return `${Math.floor(diff / day)}일전`;
  if (diff < 4 * week) return `${Math.floor(diff / week)}주전`;
  return '오래전';
};

export default function Page() {
  const { notifications } = useNotifications();

  return (
    <>
      {notifications && notifications.length > 0 ? (
        notifications.map(item => (
          <NotificationCard
            key={item.id}
            icon={IconMap[item.message.type]}
            isNew={!item.read}
            title={item.text}
            time={formatTimeAgo(item.createdAt)}
          />
        ))
      ) : (
        <div className="flex h-full items-center justify-center text-gray-50">
          알림이 없습니다
        </div>
      )}
    </>
  );
}
