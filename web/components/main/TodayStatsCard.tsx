'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTodayRunning } from '@/hooks/queries/useTodayRunning';
import StatsCard from '@/components/common/Stats/StatsCard';
import Card from '@/components/main/Card';

const TodayStatsCard = () => {
  const router = useRouter();

  const { data: todayRunningData } = useTodayRunning();

  const handleMove = () => {
    router.push('/today-run-result');
  };

  const totalDistance = todayRunningData?.totalDistanceMeter ?? 0;
  const totalTime = todayRunningData?.durationSeconds ?? 0;

  return (
    <Card
      className="relative mt-[24px] pt-[16px] pb-[16px]"
      onClick={handleMove}
    >
      <StatsCard
        title="오늘 달린 기록"
        totalDistance={totalDistance}
        totalTime={totalTime}
      />
    </Card>
  );
};

export default TodayStatsCard;
