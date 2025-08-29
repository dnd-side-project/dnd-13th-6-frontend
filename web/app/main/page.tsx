'use client';
import React, { useEffect, useState } from 'react';
import MainHeader from '@/components/main/MainHeader';
import WelcomeCard from '@/components/main/WelcomeCard';
import WeeklyGoalCard from '@/components/main/WeeklyGoalCard';
import TodayStatsCard from '@/components/main/TodayStatsCard';
import GachaCard from '@/components/main/GachaCard';
import { fetchUserInfo } from '@/utils/apis/member';
import api from '@/utils/apis/customAxios';
import { MODULE, NOTIFICATION_API, REWARD_API } from '@/utils/apis/api';
import { Notification } from '@/types/notification';
import { RunningData } from '@/types/runningTypes';
import CheerCardWrapper from '@/components/main/CheerCard/CheerCardWrapper';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { useRouter } from 'next/navigation';
interface FinishDataItem {
  averagePace: string; // ex: "0'00\""
  runningData: RunningData[]; // 배열 안에 구체적 타입이 있으면 명시 가능
  startTime: number; // timestamp (ms)
  totalDistance: number;
  totalTime: string; // ex: "00:09"
}

export default function Main() {
  const [nickname, setNickname] = useState<string>('');
  const [badgeUrl, setBadgeUrl] = useState<string>('');
  const [cloverCount, setCloverCount] = useState<number>(0);
  const [notification, setNotification] = useState<Notification[]>([]);
  const [finishData, setFinishData] = useState([]);
  const router = useRouter();
  // finishData 불러오기
  useEffect(() => {
    postMessageToApp(MODULE.AUTH);
    setFinishData(JSON.parse(localStorage.getItem('finishData') ?? '[]'));
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

  const fetchMemberData = async () => {
    try {
      const data = await fetchUserInfo();
      console.log(data);
      if (data) {
        const { nickname, badgeUrl, userId } = data;
        //  localStorage 동기화
        setNickname(nickname || '');
        setBadgeUrl(badgeUrl || '');
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('badgeUrl', badgeUrl);
        localStorage.setItem('userId', userId);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getClover = async () => {
    try {
      const res = await api.get(`${REWARD_API.CLOVER()}`);
      const clover = res.data.result.count;
      setCloverCount(clover);
      localStorage.setItem('cloverCount', clover);
      console.log('clover', clover);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchNotification = async () => {
    try {
      const res = await api.get(NOTIFICATION_API.NOTIFICATION_LIST());
      const fetched: Notification[] = res.data.result.values;

      // 기존 localStorage 알림 불러오기
      const stored: Notification[] = JSON.parse(
        localStorage.getItem('notification') || '[]'
      );

      // 기존 read 상태 반영
      const merged = fetched.map(f => {
        const prev = stored.find(
          s =>
            s.createdAt === f.createdAt && s.template.code === f.template.code
        );
        return prev ? { ...f, read: prev.read } : f;
      });

      // 최신 알림 저장
      localStorage.setItem('notification', JSON.stringify(merged));
      setNotification(merged);
    } catch (err) {
      console.error('알림 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    Promise.all([fetchMemberData(), getClover(), fetchNotification()]);
  }, []);
  return (
    <>
      <button onClick={() => router.push('/login')}>로그인</button>
      <MainHeader notification={notification} />
      <WelcomeCard nickname={nickname} badgeUrl={badgeUrl} />
      <WeeklyGoalCard />
      <TodayStatsCard />
      <div className="mt-[24px] flex gap-4">
        <CheerCardWrapper />
        <GachaCard cloverCount={cloverCount} />
      </div>
    </>
  );
}
