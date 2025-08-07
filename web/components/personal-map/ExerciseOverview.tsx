import DashBoardItem from '@/components/personal-map/DashBoardItem';
import React from 'react';

interface ExerciseOverviewProps {
  remainingDistance?: string;
  distance?: string;
  averageSpeed?: string;
  calories?: string;
}

export default function ExerciseOverview({
  remainingDistance = '0.00km',
  distance = '1.00km',
  averageSpeed = "- '--'",
  calories = '104'
}: ExerciseOverviewProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <DashBoardItem title="남은거리" value={remainingDistance} />
      <DashBoardItem title="거리" value={distance} />
      <DashBoardItem title="평균 페이스" value={averageSpeed} />
      <DashBoardItem title="칼로리" value={calories} />
    </div>
  );
}
