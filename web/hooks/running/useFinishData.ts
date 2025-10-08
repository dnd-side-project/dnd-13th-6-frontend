'use client';
import { useState, useEffect } from 'react';

interface RunningPoint {
  latitude: number;
  longitude: number;
}

interface FinishData {
  runningData: RunningPoint[];
  averagePace: string;
  totalDistance: number;
  totalTime: string;
  startTime: number;
}

export const useFinishData = () => {
  const [latestFinishData, setLatestFinishData] = useState<FinishData | null>(
    null
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const data = localStorage.getItem('finishData');
    if (data) {
      try {
        const parsedData = JSON.parse(data) as FinishData[];
        if (parsedData && parsedData.length > 0) {
          setLatestFinishData(parsedData[parsedData.length - 1]);
        }
      } catch (error) {
        console.error('Failed to parse finishData from localStorage', error);
      }
    }
  }, []);

  const pathForMap = latestFinishData?.runningData
    ? latestFinishData.runningData.map(p => ({
        lat: p.latitude,
        lng: p.longitude
      }))
    : [{ lat: 37.5665, lng: 126.978 }]; // Default path

  return { latestFinishData, pathForMap, isClient };
};
