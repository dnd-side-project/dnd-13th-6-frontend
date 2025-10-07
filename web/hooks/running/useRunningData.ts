'use client';
import { useMemo } from 'react';
import { RunningData } from '@/types/runningTypes';

interface UseRunningDataProps {
  runningData: RunningData[];
  totalTime: number; // elapsedTime from useRunningTimer (in seconds)
  targetDistance: string; // in km
}

export const useRunningData = ({
  runningData,
  totalTime,
  targetDistance
}: UseRunningDataProps) => {
  const totalDistance = useMemo(() => {
    const sum =
      runningData.reduce((acc, cur) => acc + Number(cur.distance), 0) / 1000;
    return Math.round(sum * 100) / 100;
  }, [runningData]);

  const currentSpeed = useMemo(() => {
    return runningData.length ? runningData[runningData.length - 1].speed : 0;
  }, [runningData]);

  const averagePace = useMemo(() => {
    if (totalDistance === 0 || totalTime === 0) return `0'00"`;
    const pace = totalTime / 60 / totalDistance;
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}'${seconds.toString().padStart(2, '0')}"`;
  }, [totalDistance, totalTime]);

  const remainingDistance = useMemo(() => {
    try {
      const target = parseFloat(targetDistance);
      if (isNaN(target)) return '0';

      const remainDistance = target - totalDistance;
      if (remainDistance > 0) {
        return remainDistance.toFixed(2);
      }
      if (remainDistance < 0) {
        return `+${Math.abs(remainDistance).toFixed(2)}`;
      }
      return '0';
    } catch (e) {
      console.error('Error calculating remaining distance:', e);
      return '0';
    }
  }, [targetDistance, totalDistance]);

  return {
    totalDistance,
    currentSpeed,
    averagePace,
    remainingDistance
  };
};
