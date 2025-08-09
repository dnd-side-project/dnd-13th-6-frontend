import React from 'react';
import StatCard from '@/components/personal-map/StatCard';

interface ExerciseOverviewProps {
  remainingDistance?: string;
  distance?: string;
  averageSpeed?: string;
  time?: string;
}

export default function ExerciseOverview({}: ExerciseOverviewProps) {
  return (
    <>
      <StatCard label="남은 거리" value="2.00" unit="km" />
      <StatCard label="속도" value="8.5" unit="km/h" />
      <StatCard label="평균 페이스" value="5’30”" />
      <StatCard label="시간" value="10:06" />
    </>
  );
}
