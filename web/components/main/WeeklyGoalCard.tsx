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
          <p className="pretendard-headline1 text-gray-20">
            이번주 목표
          </p>
          <div className="flex items-center">
            <p className="lufga-title1 text-primary">
              15km
            </p>
            <p className="pretendard-title2 ml-2 text-gray-20">
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
        <p className="body1 text-gray-30">
          현재까지 달린 거리
        </p>
        <p className="pretendard-headline font-lufga italic text-gray-20">
          10km
        </p>
      </div>
      <div className="mt-[8px] flex items-center justify-between">
        <p className="body1 text-gray-30">
          목표까지 남은 거리
        </p>
        <p className="pretendard-headline font-lufga italic text-gray-20">
          5km
        </p>
      </div>
    </Card>
  );
};

export default WeeklyGoalCard;
