'use client';
import React, { useEffect, useState } from 'react';
import { ChatTeardropDots, Clover, FlagPennant } from '@phosphor-icons/react';
import NotificationCard from '@/components/notification/NotificationCard';

const iconMap = {
  CHEER: <Clover size={20} color={'#F2F2F7'} />,
  PERSONAL_GOAL_ACHIEVED: <FlagPennant size={20} color={'#F2F2F7'} />,
  PERSONAL_GOAL_FAILED: <FlagPennant size={20} color={'#F2F2F7'} />,
  CREW_GOAL_ACHIEVED: <FlagPennant size={20} color={'#F2F2F7'} />,
  CREW_GOAL_FAILED: <FlagPennant size={20} color={'#F2F2F7'} />,
  CREW_DISBANDED: <ChatTeardropDots size={20} color={'#F2F2F7'} />,
  RUN_STARTED: <FlagPennant size={20} color={'#F2F2F7'} />
};

type IconCode = keyof typeof iconMap;

interface Notification {
  createdAt: string; // 또는 startedAt
  read: boolean;
  template: {
    code: IconCode;
    raw: string;
    variables: { [key: string]: string | number };
    emphasize: string[];
  };
}

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
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const storedNotifications = JSON.parse(
      localStorage.getItem('notification') || '[]'
    );
    setNotifications(storedNotifications);
    // cleanup: 페이지 언마운트 시 read 처리
    return () => {
      const updated = storedNotifications.map((n: Notification) => ({
        ...n,
        read: true
      }));
      localStorage.setItem('notification', JSON.stringify(updated));
    };
  }, []);

  const formatTitle = (
    raw: string,
    variables: { [key: string]: string | number }
  ) => {
    return raw.replace(/\$\{(\w+)\}/g, (_, key) => {
      const value = variables[key];
      return value !== undefined ? String(value) : '';
    });
  };

  return (
    <>
      {notifications && notifications.length > 0 ? (
        notifications.map((item, index) => (
          <NotificationCard
            key={index}
            isNew={!item.read}
            icon={iconMap[item.template.code]}
            title={formatTitle(item.template.raw, item.template.variables)}
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
