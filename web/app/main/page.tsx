'use client';
import React, { useEffect, useState } from 'react';
import MainHeader from '@/components/main/MainHeader';
import WelcomeCard from '@/components/main/WelcomeCard';
import WeeklyGoalCard from '@/components/main/WeeklyGoalCard';
import TodayStatsCard from '@/components/main/TodayStatsCard';
import CheerCardWrapper from '@/components/main/CheerCard/CheerCardWrapper';
import GachaCard from '@/components/main/GachaCard';
import { fetchUserInfo } from '@/utils/apis/member';
import api from '@/utils/apis/customAxios';
import { NOTIFICATION_API, REWARD_API } from '@/utils/apis/api';
import { Notification } from '@/types/notification';
import { RunningData } from '@/types/runningTypes';

interface FinishDataItem {
  averagePace: string; // ex: "0'00\""
  runningData: RunningData[]; // 배열 안에 구체적 타입이 있으면 명시 가능
  startTime: number; // timestamp (ms)
  totalDistance: number;
  totalTime: string; // ex: "00:09"
}
const NotificationMockData = [
  {
    id: 101,
    title: '런닝',
    text: '완주GO의 진수님이 런닝을 시작했어요!',
    senderId: 20,
    read: false,
    createdAt: '2025-08-23T10:00:20Z',
    template: {
      code: 'RUN_START',
      version: 1,
      locale: 'ko-KR',
      raw: '$\{CREW_NAME}의 ${NICKNAME} 님이 런닝을 시작했어요!',
      variables: {
        CREW_NAME: '완주GO',
        NICKNAME: '진수'
      },
      emphasize: ['CREW_NAME', 'NICKNAME']
    }
  }
];
export default function Main() {
  const [nickname, setNickname] = useState<string>('');
  const [badgeUrl, setBadgeUrl] = useState<string>('');
  const [cloverCount, setCloverCount] = useState<number>(0);
  const [notification, setNotification] = useState<Notification[]>([]);
  const [finishData, setFinishData] = useState([]);
  // finishData 불러오기
  useEffect(() => {
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
    const res = await api.get(NOTIFICATION_API.NOTIFICATION_LIST());
    console.log(res.data.result.values);
    setNotification(res.data.result.values);

    //todo:나중에 완료되면 켜야함
    // localStorage.setItem(
    //   'notification',
    //   JSON.stringify(res.data.result.values)
    // );
    localStorage.setItem('notification', JSON.stringify(NotificationMockData));
    setNotification(NotificationMockData);
  };

  useEffect(() => {
    Promise.all([fetchMemberData(), getClover(), fetchNotification()]);
  }, []);
  return (
    <>
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
