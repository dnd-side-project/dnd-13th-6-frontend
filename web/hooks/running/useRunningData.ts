'use client';
import { useMemo } from 'react';
import { RunningData } from '@/types/runningTypes';

interface UseRunningDataProps {
  runningData: RunningData[][];
  totalTime: number; // elapsedTime from useRunningTimer (in seconds)
  targetDistance: string; // in km
}

export const useRunningData = ({
  runningData,
  totalTime,
  targetDistance
}: UseRunningDataProps) => {
  const totalDistance = useMemo(() => {
    const total = runningData.reduce((acc, segment, segmentIndex) => {
      const segmentTotal = segment.reduce((segmentAcc, point, pointIndex) => {
        // 첫 번째 세그먼트가 아니면서, 해당 세그먼트의 첫 번째 포인트인 경우
        // distance 값을 합산에서 제외합니다.
        if (segmentIndex > 0 && pointIndex === 0) {
          return segmentAcc;
        }
        return segmentAcc + Number(point.distance);
      }, 0);
      return acc + segmentTotal;
    }, 0);

    const sumInKm = total / 1000;
    return Math.round(sumInKm * 100) / 100;
  }, [runningData]);

  const currentSpeed = useMemo(() => {
    const lastSegment = runningData[runningData.length - 1];
    if (!lastSegment || !lastSegment.length) return 0;
    return lastSegment[lastSegment.length - 1].speed;
  }, [runningData]);

  const averagePace = useMemo(() => {
    if (totalDistance == 0 || totalTime == 0) return `0'00"`;
    const pace = totalTime / 60 / totalDistance;
    if(isNaN(pace))  return `0'00"`;
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
