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
import { queryKeys } from '@/utils/queries/queryKeys';
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
  const [displayNotifications, setDisplayNotifications] = useState<
    Notification[]
  >([]);
  //사용자 정보
  const { data: userInfo, isSuccess: isUserInfoSucess } = useQuery<UserInfo>({
    queryKey: queryKeys.member.info(),
    queryFn: fetchUserInfo
  });
  //클로버 개수
  const { data: cloverCount, isSuccess: isCloverCountSucess } = useQuery({
    queryKey: queryKeys.reward.cloverCount(),
    queryFn: async () => {
      const res = await api.get(`${REWARD_API.CLOVER()}`);
      return res.data.result.count;
    }
  });

  const { data: notifications, isSuccess: isNotificationSucess } = useQuery<
    Notification[]
  >({
    queryKey: queryKeys.notification.all,
    queryFn: fetchNotification,
    staleTime: 0, // 데이터를 가져오자마자 stale 상태로 만듦
    gcTime: 0 // 컴포넌트가 사라지면 캐시를 즉시 삭제
  });

  useEffect(() => {
    if (userInfo) {
      const { nickname, badgeUrl, userId } = userInfo;
      localStorage.setItem('nickname', nickname || '');
      localStorage.setItem('badgeUrl', badgeUrl || '');
      localStorage.setItem('userId', userId || '');
    }
  }, [userInfo]);

  useEffect(() => {
    // cloverCount가 0일 수도 있으므로 undefined가 아닌지 확인
    if (typeof cloverCount !== 'undefined') {
      localStorage.setItem('cloverCount', String(cloverCount));
    }
  }, [cloverCount]);

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
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        window.history.replaceState(null, '', window.location.pathname);
      }
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
