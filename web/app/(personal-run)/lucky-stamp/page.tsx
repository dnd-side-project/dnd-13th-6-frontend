'use client';

import React, { useEffect, useState } from 'react';
import RunRewardPage from '@/components/running/RunRewardPage';
import { GOAL_API, RUNNING_API } from '@/utils/apis/api';
import api from '@/utils/apis/customAxios';

export default function LuckyStampPage() {
  //성공 기준 이번주 꺼 100퍼 이상 달렸냐
  const [isSuccess, setIsSuccess] = useState(false);
  const [targetDistance, setTargetDistance] = useState(0);
  const [weeklyRun, setWeeklyRun] = useState(0);
  const fetchData = async () => {
    try {
      const targetRes = await api.get(GOAL_API.GET_TARGET_DISTANCE());
      const weeklyRunRes = await api.get(RUNNING_API.WEEKLY_RUNNINGS());
      setTargetDistance(targetRes.data.result.goal);
      setWeeklyRun(weeklyRunRes.data.result.totalDistanceKm);
      const calSuccess =
        weeklyRunRes.data.result.totalDistanceKm - targetRes.data.result.goal >=
        1;
      setIsSuccess(calSuccess);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <RunRewardPage
      type={'personal'}
      isSuccess={isSuccess}
      remainingDistance={targetDistance - weeklyRun}
    />
  );
}
