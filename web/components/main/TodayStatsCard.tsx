'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/main/Card';
import { useRouter } from 'next/navigation';
import api from '@/utils/apis/customAxios';
import { RUNNING_API } from '@/utils/apis/api';

const TodayStatsCard = () => {
  const router = useRouter();
  const [todayRun, setTodayRun] = useState();
  const fetchData = async () => {
    try {
      const res = await api.get(RUNNING_API.RUNNING_TODAY());
      console.log('오늘', res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card
      className="relative mt-[24px] pt-[16px] pb-[16px]"
      onClick={() => {
        router.push('/last-run-result');
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
