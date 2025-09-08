'use client';
import React, { useEffect, useState } from 'react';
import MainHeader from '@/components/main/MainHeader';
import WelcomeCard from '@/components/main/WelcomeCard';
import WeeklyGoalCard from '@/components/main/WeeklyGoalCard';
import TodayStatsCard from '@/components/main/TodayStatsCard';
import GachaCard from '@/components/main/GachaCard';
import { fetchUserInfo } from '@/utils/queries/member';
import api from '@/utils/apis/customAxios';
import { MODULE, NOTIFICATION_API, REWARD_API } from '@/utils/apis/api';
import { Notification } from '@/types/notification';
import { RunningData } from '@/types/runningTypes';
import CheerCardWrapper from '@/components/main/CheerCard/CheerCardWrapper';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotification } from '@/utils/queries/notification';
interface FinishDataItem {
  averagePace: string; // ex: "0'00"
  runningData: RunningData[]; // 배열 안에 구체적 타입이 있으면 명시 가능
  startTime: number; // timestamp (ms)
  totalDistance: number;
  totalTime: string; // ex: "00:09"
}
interface UserInfo {
  nickname: string;
  badgeUrl: string;
  userId: string;
  badgeId: number;
}

export default function Main() {
  const [finishData, setFinishData] = useState([]);
  const router = useRouter();
  //사용자 정보
  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo
  });
  //클로버 개수
  const { data: cloverCount } = useQuery({
    queryKey: ['cloverCount'],
    queryFn: async () => {
      const res = await api.get(`${REWARD_API.CLOVER()}`);
      return res.data.result.count;
    }
  });

  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: fetchNotification,
    staleTime: 0, // 데이터를 가져오자마자 stale 상태로 만듦
    gcTime: 0 // 컴포넌트가 사라지면 캐시를 즉시 삭제
  });
  //통신들 성공 후 localStorage 저장
  useEffect(() => {
    if (userInfo) {
      const { nickname, badgeUrl, userId, badgeId } = userInfo;
      localStorage.setItem('nickname', nickname || '');
      localStorage.setItem('badgeUrl', badgeUrl || '');
      localStorage.setItem('userId', userId || '');
    }
    if (cloverCount) {
      localStorage.setItem('cloverCount', String(cloverCount));
    }
    if (notifications) {
      localStorage.setItem('notification', JSON.stringify(notifications));
    }
  }, []);

  // finishData 불러오기
  useEffect(() => {
    setFinishData(JSON.parse(localStorage.getItem('finishData') ?? '[]'));
    const hash = window.location.hash.substring(1);
    if (hash) {
      const params = new URLSearchParams(hash);
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // URL 정리
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
    postMessageToApp(MODULE.AUTH);
  }, []);

  if (finishData.length > 0) {
    // 오늘 날짜 구하기 (로컬 시간 기준)
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // 오늘 데이터만 필터링
    const todayData = finishData.filter((item: FinishDataItem) => {
      const itemDate = new Date(item.startTime); // 각 아이템의 시간
      return (
        itemDate.getFullYear() === todayYear &&
        itemDate.getMonth() === todayMonth &&
        itemDate.getDate() === todayDate
      );
    });

    console.log(todayData); // 오늘 데이터만 남은 배열
    localStorage.setItem('finishData', JSON.stringify(todayData));
  }
  return (
    <>
      <button onClick={() => router.push('/login')}>로그인</button>
      <MainHeader notification={notifications || []} />
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
