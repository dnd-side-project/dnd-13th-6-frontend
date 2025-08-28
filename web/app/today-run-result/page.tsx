'use client';
import { useEffect, useState } from 'react';
import TodayRunPage from '@/components/today-run-result/TodayRunPage';

type FinishData = {
  runningData: {
    latitude: number;
    longitude: number;
  }[];
  averagePace: string;
  totalDistance: number;
  totalTime: string;
  startTime: number;
};
function Page() {
  const [finishData, setFinishData] = useState<FinishData[] | null>(null);
  useEffect(() => {
    const data = localStorage.getItem('finishData');
    if (data) {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        setFinishData(parsedData);
      } else {
        setFinishData([parsedData]);
      }
    }
  }, []);
  return (
    <>
      {finishData &&
        finishData.map(data => {
          return (
            <div className="h-screen" key={data.startTime}>
              <TodayRunPage finishData={data} />
            </div>
          );
        })}
    </>
  );
}

export default Page;
