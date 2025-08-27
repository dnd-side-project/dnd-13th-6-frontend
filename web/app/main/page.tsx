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
  // const accessToken = cookieStore.get('accessToken')?.value;
  // console.log('accessToken', accessToken);
  const fetchMemberData = async () => {
    try {
      const data = await fetchUserInfo();
      console.log(data);
      if (data) {
        const { nickname, badgeUrl } = data;
        //  localStorage 동기화
        setNickname(nickname || '');
        setBadgeUrl(badgeUrl || '');
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('badgeUrl', badgeUrl);
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
      console.log(clover);
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
        <GachaCard />
      </div>
    </>
  );
}
