import React from 'react';
import Card from '@/components/main/Card';

const TodayStatsCard = () => {
  return (
    <Card className="relative mt-[24px] py-[28px]">
      <p className="body1 text-gray-30">
        오늘 달린 기록
      </p>
      <div className="mt-[12px] flex justify-around">
        <div className="flex flex-col items-center">
          <p className="lufga-title1 text-gray-20 inline-block -skew-x-2 transform text-[1.75rem] font-semibold tracking-[0]">
            1.3km
          </p>
          <p className="pretendard-headline2">
            거리
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="lufga-title1 text-gray-20 text-[1.75rem] font-semibold tracking-[0]">
            1:06
          </p>
          <p className="pretendard-headline2">
            시간
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="lufga-title1 text-gray-20 text-[1.75rem] font-semibold tracking-[0]">
            {`'-'--''`}
          </p>
          <p className="pretendard-headline2">
            페이스
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TodayStatsCard;
