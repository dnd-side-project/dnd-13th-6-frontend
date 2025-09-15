'use client';

import React from 'react';
import RunRewardPage from '@/components/running/RunRewardPage';
import { useGoalDistance } from '@/hooks/queries/useGoalDistance';
import { useWeeklyRunDistance } from '@/hooks/queries/useWeeklyRunDistance';

export default function LuckyStampPage() {
  const { data: targetDistance = 0, isLoading: isGoalLoading } = useGoalDistance();

  const { data: weeklyRun = 0, isLoading: isWeeklyRunLoading } = useWeeklyRunDistance();

  if (isGoalLoading || isWeeklyRunLoading) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  const isSuccess = weeklyRun - targetDistance >= 0;
  const remainingDistance = targetDistance - weeklyRun;

  return (
    <RunRewardPage
      type={'personal'}
      isSuccess={isSuccess}
      remainingDistance={remainingDistance}
    />
  );
}
