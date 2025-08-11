import React from 'react';
import StatCard from '@/components/running/OverView/StatCard';

interface ExerciseOverviewProps {
  remainingDistance: string;
  velocity: string;
  averagePace: string;
  time: string;
}

export default function ExerciseOverview({
  remainingDistance,
  velocity,
  averagePace,
  time
}: ExerciseOverviewProps) {
  return (
    <>
      <StatCard label="남은 거리" value={remainingDistance} unit="km" />
      <StatCard label="속도" value={velocity} unit="km/h" />
      <StatCard label="평균 페이스" value={averagePace} />
      <StatCard label="시간" value={time} />
    </>
  );
}
