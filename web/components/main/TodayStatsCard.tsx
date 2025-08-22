'use client';
import React from 'react';
import Card from '@/components/main/Card';
import { useRouter } from 'next/navigation';

const TodayStatsCard = () => {
  const router = useRouter();
  return (
    <Card
      className="relative mt-[24px] pt-[16px] pb-[16px]"
      onClick={() => {
        router.push('/run-finish');
      }}
    >
      <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
        오늘 달린 기록
      </p>
      <div className="mt-[12px] flex justify-around">
        <div className="flex flex-col items-center">
          <p className="font-lufga text-gray-20 inline-block -skew-x-2 transform text-[1.75rem] font-semibold tracking-[0] italic">
            1.3km
          </p>
          <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">
            거리
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-lufga text-gray-20 text-[1.75rem] font-semibold tracking-[0] italic">
            1:06
          </p>
          <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">
            시간
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-lufga text-gray-20 text-[1.75rem] font-semibold tracking-[0] italic">
            {`'-'--''`}
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
