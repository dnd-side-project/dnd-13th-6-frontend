'use client';
import React from 'react';
import Card from '@/components/main/Card';
import { useRouter } from 'next/navigation';
import { useTodayRunning } from '@/hooks/queries/useTodayRunning';

const TodayStatsCard = () => {
  const router = useRouter();

  const { data: todayRunningData } = useTodayRunning();

  const formatDistance = (meters: number) => {
    if (!meters) return '0';
    return (meters / 1000).toFixed(2);
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '0';
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const formatPace = (distanceMeters: number, durationSeconds: number) => {
    if (!distanceMeters || !durationSeconds) return "-'--''";
    const paceSec = durationSeconds / (distanceMeters / 1000);
    const min = Math.floor(paceSec / 60);
    if (min >= 50) return "-'--''";

    const sec = Math.round(paceSec % 60);
    return `${min}'${sec.toString().padStart(2, '0')}''`;
  };

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
      <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
        오늘 달린 기록
      </p>
      <div className="mt-[12px] flex justify-around">
        <div className="flex flex-col items-center">
          <p className="font-lufga text-gray-20 inline-block -skew-x-2 transform text-[1.75rem] font-semibold tracking-[0] italic">
            {formatDistance(totalDistance)}km
          </p>
          <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">
            거리
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-lufga text-gray-20 text-[1.75rem] font-semibold tracking-[0] italic">
            {formatTime(totalTime)}
          </p>
          <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">
            시간
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-lufga text-gray-20 text-[1.75rem] font-semibold tracking-[0] italic">
            {formatPace(totalDistance, totalTime)}
          </p>
          <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">
            페이스
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TodayStatsCard;
