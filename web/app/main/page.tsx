'use client';
import React, { useEffect, useState } from 'react';
import MainHeader from '@/components/main/MainHeader';
import WelcomeCard from '@/components/main/WelcomeCard';
import WeeklyGoalCard from '@/components/main/WeeklyGoalCard';
import TodayStatsCard from '@/components/main/TodayStatsCard';
import GachaCard from '@/components/main/GachaCard';
import { Notification } from '@/types/notification';
import { RunningData } from '@/types/runningTypes';
import CheerCardWrapper from '@/components/main/CheerCard/CheerCardWrapper';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { useRouter } from 'next/navigation';
import { MODULE } from '@/utils/apis/api';
import { useUserInfo } from '@/hooks/queries/useUserInfo';
import { useCloverCount } from '@/hooks/queries/useCloverCount';
import { useNotifications } from '@/hooks/queries/useNotifications';
interface FinishDataItem {
  averagePace: string; // ex: "0'00"
  runningData: RunningData[]; // 배열 안에 구체적 타입이 있으면 명시 가능
  startTime: number; // timestamp (ms)
  totalDistance: number;
  totalTime: string; // ex: "00:09"
}

export default function Main() {
  const [, setFinishData] = useState([]);
  const router = useRouter();
  const [displayNotifications, setDisplayNotifications] = useState<
    Notification[]
  >([]);
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
      console.log(merged);
      localStorage.setItem('notification', JSON.stringify(merged));
      setDisplayNotifications(merged);
    }
  }, [notifications]);

  // 컴포넌트 마운트 시 토큰 처리 및 데이터 로딩
  useEffect(() => {
    // URL 해시에서 토큰 정보 처리
    const hash = window.location.hash.substring(1);
    if (hash) {
      const params = new URLSearchParams(hash);
      console.log('params', params);
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // URL 정리
        window.history.replaceState(null, '', window.location.pathname);
      }
      postMessageToApp(
        MODULE.AUTH,
        JSON.stringify({ accessToken, refreshToken })
      );
    }
    postMessageToApp(MODULE.AUTH);

    // 로컬 스토리지에서 finishData 로딩 및 오늘 날짜 데이터로 필터링
    const storedFinishData = JSON.parse(
      localStorage.getItem('finishData') ?? '[]'
    );
    if (storedFinishData.length > 0) {
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDate = today.getDate();

      const todayData = storedFinishData.filter((item: FinishDataItem) => {
        const itemDate = new Date(item.startTime);
        return (
          itemDate.getFullYear() === todayYear &&
          itemDate.getMonth() === todayMonth &&
          itemDate.getDate() === todayDate
        );
      });

      setFinishData(todayData);

      // 필터링된 데이터가 기존 데이터와 다를 경우에만 로컬 스토리지 업데이트
      if (JSON.stringify(todayData) !== JSON.stringify(storedFinishData)) {
        localStorage.setItem('finishData', JSON.stringify(todayData));
      }
    }
  }, []);
  return (
    <>
      <button onClick={() => router.push('/login')}>로그인</button>
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
