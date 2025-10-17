'use client';
import React, { useEffect, useState } from 'react';
import MainHeader from '@/components/main/MainHeader';
import WelcomeCard from '@/components/main/WelcomeCard';
import WeeklyGoalCard from '@/components/main/WeeklyGoalCard';
import GachaCard from '@/components/main/GachaCard';
import { Notification } from '@/types/notification';
import CheerCardWrapper from '@/components/main/CheerCard/CheerCardWrapper';
import { useUserInfo } from '@/hooks/queries/useUserInfo';
import { useCloverCount } from '@/hooks/queries/useCloverCount';
import { useNotifications } from '@/hooks/queries/useNotifications';
import TodayStatsCard from '@/components/main/TodayStatsCard';
import { useAuthToken } from '@/hooks/user/useAuthToken';

export default function Main() {
  const [displayNotifications, setDisplayNotifications] = useState<
    Notification[]
  >([]);
  useAuthToken();
  //사용자 정보
  const { data: userInfo } = useUserInfo();
  //클로버 개수
  const { data: cloverCount } = useCloverCount();

  const { data: notifications } = useNotifications();

  useEffect(() => {
    if (notifications) {
      const fetched: Notification[] = notifications;
      const stored: Notification[] = JSON.parse(
        localStorage.getItem('notification') || '[]'
      );
      const merged = fetched.map(f => {
        const prev = stored.find(
          s => s.id === f.id && s.template?.code === f.template?.code
        );
        return prev ? { ...f, read: prev.read } : { ...f, read: false };
      });
      localStorage.setItem('notification', JSON.stringify(merged));
      setDisplayNotifications(merged);
    }
  }, [notifications]);

  return (
    <>
      {/* <button onClick={() => router.push('/login')}>로그인</button> */}
      <MainHeader notification={displayNotifications} />
      <WelcomeCard
        nickname={userInfo?.nickname || ''}
        badgeUrl={userInfo?.badgeUrl || ''}
        badgeId={userInfo?.badgeId || 0}
      />
      <WeeklyGoalCard />
      <TodayStatsCard />
      <div className="mt-[24px] flex gap-4">
        <CheerCardWrapper />
        <GachaCard cloverCount={cloverCount || 0} />
      </div>
    </>
  );
}
