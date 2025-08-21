import React from 'react';
import Card from '@/components/main/Card';
import ControlButton from '@/components/running/Control/ControlButton';
import { Play } from 'lucide-react';
import ProgressBar from '@/components/common/ProgressBar';

const WeeklyGoalCard = () => {
  return (
    <Card className="relative mt-[24px] py-[28px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="tex-[1.0625rem] text-gray-20 leading-[150%] font-bold tracking-tight">
            이번주 목표
          </p>
          <div className="flex items-center">
            <p className="text-primary font-lufga text-[2.0625rem] leading-[1.4] font-bold tracking-[0] italic">
              15km
            </p>
            <p className="text-gray-20 ml-2 text-[1.5rem] leading-[1.4] font-bold tracking-[-0.025em]">
              달리기
            </p>
          </div>
        </div>
        <ControlButton className="h-[48px] w-[48px]">
          <Play className="h-[24px] w-[24px] fill-black text-black" />
        </ControlButton>
      </div>
      <ProgressBar
        progress={70}
        className="mt-[16px] h-[8px]"
        backgroundColor="bg-background"
        barColor="bg-gradient-to-r from-primary to-[#69b4ff]"
      />
      <div className="mt-[14px] flex items-center justify-between">
        <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
          현재까지 달린 거리
        </p>
        <p className="font-lufga text-gray-20 text-[1.1875rem] leading-[1.4] font-medium tracking-[-0.025em] italic">
          10km
        </p>
      </div>
      <div className="mt-[8px] flex items-center justify-between">
        <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
          목표까지 남은 거리
        </p>
        <p className="font-lufga text-gray-20 text-[1.1875rem] leading-[1.4] font-medium tracking-[-0.025em] italic">
          5km
        </p>
      </div>
    </Card>
  );
};

export default WeeklyGoalCard;
