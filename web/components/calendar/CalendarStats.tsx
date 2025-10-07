import React from 'react';
import StatsCard from '@/components/common/Stats/StatsCard';

interface CalendarStatsProps {
  totalDistance: number;
  totalTime: number;
}

export default function CalendarStats({
  totalDistance,
  totalTime,
}: CalendarStatsProps) {
  return (
    <StatsCard
      className="mt-10"
      totalDistance={totalDistance}
      totalTime={totalTime}
    />
  );
}