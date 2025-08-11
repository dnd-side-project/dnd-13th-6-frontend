import React from 'react';
import StatCard from '@/components/running/OverView/StatCard';

type FinishOverViewProps = {
  averagePace: string;
  time: string;
  startTime: string;
};

function FinishOverView({ averagePace, time, startTime }: FinishOverViewProps) {
  return (
    <div className="flex justify-around">
      <StatCard label="평균 페이스" value={averagePace} />
      <StatCard label="시간" value={time} />
      <StatCard label="시작 시간" value={startTime} />
    </div>
  );
}

export default FinishOverView;
