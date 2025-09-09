'use client';

import React from 'react';
import RunRewardPage from '@/components/running/RunRewardPage';
import { useQuery } from '@tanstack/react-query';
import { getGoalDistance } from '@/utils/queries/goal';
import { getWeeklyRunDistance } from '@/utils/queries/running';
import { queryKeys } from '@/utils/queries/queryKeys';

export default function LuckyStampPage() {
  const { data: targetDistance = 0, isLoading: isGoalLoading } = useQuery({
    queryKey: queryKeys.goal.goalDistance(),
    queryFn: getGoalDistance,
  });

  const { data: weeklyRun = 0, isLoading: isWeeklyRunLoading } = useQuery({
    queryKey: queryKeys.running.weekly(),
    queryFn: getWeeklyRunDistance,
  });

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