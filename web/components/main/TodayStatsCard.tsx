'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/main/Card';
import { useRouter } from 'next/navigation';
import api from '@/utils/apis/customAxios';
import { RUNNING_API } from '@/utils/apis/api';

const TodayStatsCard = () => {
  const router = useRouter();
  const [totalDistance, setTotalDistance] = useState(0); // meters
  const [totalTime, setTotalTime] = useState(0); // seconds
  const [distanceForPace, setDistanceForPace] = useState(0); // meters

  //  변환
  const formatDistance = (meters: number) => {
    if (!meters) return '0';
    return (meters / 1000).toFixed(2);
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '0';
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const formatPace = (distanceMeters: number, durationSeconds: number) => {
    if (!distanceMeters || !durationSeconds) return "-'--''"; // 0일 때 표시
    const paceSec = durationSeconds / (distanceMeters / 1000);
    const min = Math.floor(paceSec / 60);
    if (min >= 50) return "-'--''"; // Set upper limit for pace to 50 min/km

    const sec = Math.round(paceSec % 60);
    return `${min}'${sec.toString().padStart(2, '0')}''`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(RUNNING_API.RUNNING_TODAY());
        console.log('오늘', res.data);
        setTotalDistance(res.data.result.totalDistanceMeter);
        setTotalTime(res.data.result.durationSeconds);
        setDistanceForPace(res.data.result.totalDistanceMeter);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleMove = () => {
    router.push('/today-run-result');
  };
  return (
    <Card
      className="relative mt-[24px] pt-[16px] pb-[16px]"
      onClick={handleMove}
    >
      <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">        오늘 달린 기록
      </p>
      <div className="mt-[12px] flex justify-around">
        <div className="flex flex-col items-center">
          <p className="font-lufga text-gray-20 inline-block -skew-x-2 transform text-[1.75rem] font-semibold tracking-[0] italic">
            {formatDistance(totalDistance)}km
          </p>
          <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">            거리
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-lufga text-gray-20 text-[1.75rem] font-semibold tracking-[0] italic">
            {formatTime(totalTime)}
          </p>
          <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">            시간
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-lufga text-gray-20 text-[1.75rem] font-semibold tracking-[0] italic">
            {formatPace(distanceForPace, totalTime)}
          </p>
          <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">            페이스
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TodayStatsCard;