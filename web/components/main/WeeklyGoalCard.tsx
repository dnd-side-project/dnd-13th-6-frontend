'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/main/Card';
import ProgressBar from '@/components/common/ProgressBar';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import api from '@/utils/apis/customAxios';
import { GOAL_API, RUNNING_API } from '@/utils/apis/api';

const WeeklyGoalCard = () => {
  const [goalDistance, setGoalDistance] = useState<number>(0);
  const [weeklyRunDistance, setWeeklyRunDistance] = useState<number>(0);
  const getGoalDistance = async () => {
    try {
      const res = await api.get(GOAL_API.GET_TARGET_DISTANCE());
      setGoalDistance(res.data.result.goal);
      localStorage.setItem('weeklyGoalDistance', res.data.result.goal);
      console.log('목표거리', res.data);
    } catch (err) {}
  };
  const getWeeklyRunDistance = async () => {
    try {
      const res = await api.get(RUNNING_API.WEEKLY_RUNNINGS());
      setWeeklyRunDistance(res.data.result.totalDistanceKm);
      console.log('뛴거리', res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getGoalDistance();
    getWeeklyRunDistance();
  }, []);
  const remainingDistance = goalDistance - weeklyRunDistance;
  const progress = (weeklyRunDistance / goalDistance) * 100;
  const router = useRouter();
  return (
    <Card
      className="relative mt-[24px] py-[28px]"
      onClick={() => router.push('/change-target-distance')}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="tex-[1.0625rem] text-gray-20 leading-[150%] font-bold tracking-tight">
            이번주 목표
          </p>
          <div className="flex items-center">
            <p className="text-primary font-lufga text-[2.0625rem] leading-[1.4] font-bold tracking-[0] italic">
              {goalDistance}km
            </p>
            <p className="text-gray-20 ml-2 text-[1.5rem] leading-[1.4] font-bold tracking-[-0.025em]">
              달리기
            </p>
          </div>
        </div>
      </div>
      <ProgressBar
        progress={progress}
        className="mt-[16px] h-[8px]"
        backgroundStyle="bg-background"
        barStyle="bg-gradient-to-r from-primary to-[#69b4ff]"
      />
      <div className="mt-[14px] flex items-center justify-between">
        <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
          현재까지 달린 거리
        </p>
        <p className="font-lufga itailic text-gray-20 text-[1.1875rem] leading-[1.4] font-medium tracking-[-0.025em] italic">
          {weeklyRunDistance}km
        </p>
      </div>
      <div className="mt-[8px] flex items-center justify-between">
        <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
          목표까지 남은 거리
        </p>
        <p className="font-lufga text-gray-20 text-[1.1875rem] leading-[1.4] font-medium tracking-[-0.025em] italic">
          {remainingDistance}km
        </p>
      </div>
      <Button
        className="mt-5 h-12 w-full text-[0.9375rem] leading-[1.5] font-bold tracking-[-0.025em] text-black"
        onClickAction={() => {
          router.push('/prepare-run');
        }}
      >
        시작하기
      </Button>
    </Card>
  );
};

export default WeeklyGoalCard;
