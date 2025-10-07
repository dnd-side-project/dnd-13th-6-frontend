'use client';
import { useState, useEffect } from 'react';
import { RunningData } from '@/types/runningTypes';

interface FinishDataItem {
  averagePace: string;
  runningData: RunningData[];
  startTime: number;
  totalDistance: number;
  totalTime: string;
}

export const useTodayRunData = () => {
  const [todayData, setTodayData] = useState<FinishDataItem[]>([]);

  useEffect(() => {
    const storedFinishData = JSON.parse(
      localStorage.getItem('finishData') ?? '[]'
    );

    if (storedFinishData.length > 0) {
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDate = today.getDate();

      const filteredData = storedFinishData.filter((item: FinishDataItem) => {
        const itemDate = new Date(item.startTime);
        return (
          itemDate.getFullYear() === todayYear &&
          itemDate.getMonth() === todayMonth &&
          itemDate.getDate() === todayDate
        );
      });

      setTodayData(filteredData);

      // 오늘 날짜 데이터만 남도록 localStorage 업데이트
      if (JSON.stringify(filteredData) !== JSON.stringify(storedFinishData)) {
        localStorage.setItem('finishData', JSON.stringify(filteredData));
      }
    }
  }, []);

  return todayData;
};
