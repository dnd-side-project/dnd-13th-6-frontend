'use client';

import { useEffect, useState, useCallback } from 'react';
import { RunningData } from '@/types/runningTypes';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { useStartRunning } from '@/hooks/queries/useStartRunning';
import { useEndRunning } from '@/hooks/queries/useEndRunning';
import { useRunningTimer } from '@/hooks/running/useRunningTimer';
import { useStompConnection } from '@/hooks/api/useStompConnection';
import { useRunningData } from '@/hooks/running/useRunningData';
import { useSwipeNavigation } from '@/hooks/ui/useSwipeNavigation';
import { SEND_MESSAGE_TYPE } from '@/utils/webView/consts';

export const useRunningSession = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [runningData, setRunningData] = useState<RunningData[][]>([[]]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [targetDistance, setTargetDistance] = useState('0');

  const { mutate: startRunningMutate } = useStartRunning();
  const { mutate: endRunningMutate } = useEndRunning();

  const {
    elapsedTime: totalTime,
    formattedTime,
    sessionStartTime
  } = useRunningTimer({
    isRunning,
    isPaused
  });

  const { totalDistance, currentSpeed, averagePace, remainingDistance } =
    useRunningData({
      runningData,
      totalTime,
      targetDistance
    });

  const handleNewRunningData = useCallback((newPoint: RunningData) => {
    // Validate latitude and longitude
    if (
      typeof newPoint.latitude !== 'number' ||
      isNaN(newPoint.latitude) ||
      typeof newPoint.longitude !== 'number' ||
      isNaN(newPoint.longitude)
    ) {
      console.warn('Invalid newPoint received, skipping:', newPoint);
      return; // Skip if coordinates are invalid
    }

    setRunningData(prev => {
      const newPaths = [...prev];
      if (newPaths.length > 0) {
        const lastPath = newPaths[newPaths.length - 1];
        lastPath.push(newPoint);
      }
      return newPaths;
    });
  }, []);

  useStompConnection({ onMessageReceived: handleNewRunningData });

  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipeNavigation({
      onSwipeLeft: () => setCurrentPage(prev => Math.min(prev + 1, 1)),
      onSwipeRight: () => setCurrentPage(prev => Math.max(prev - 1, 0))
    });

  const handleControl = useCallback(
    async (action: 'play' | 'pause' | 'stop' | 'resume') => {
      const runningId = localStorage.getItem('runningId');
      const runnerId = localStorage.getItem('runnerId');

      switch (action) {
        case 'play':
          setIsRunning(true);
          setIsPaused(false);
          const data = JSON.stringify({ runningId, runnerId });
          postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_START, data);
          break;
        case 'pause':
          setIsPaused(true);
          postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_PAUSE);
          break;
        case 'resume':
          setIsPaused(false);
          setRunningData(prev => [...prev, []]);
          postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_START);
          break;
        case 'stop':
          const flatRunningData = runningData.flat();
          const finishData = {
            runningData: flatRunningData,
            averagePace: averagePace,
            totalDistance: totalDistance * 1000,
            totalTime: formattedTime,
            startTime: sessionStartTime || 0
          };

          let existingData = [];
          try {
            const storedData = localStorage.getItem('finishData');
            if (storedData) {
              existingData = JSON.parse(storedData);
            }
          } catch (e) {
            console.error("localStorage 'finishData' 파싱 에러:", e);
            existingData = [];
          }

          localStorage.setItem(
            'finishData',
            JSON.stringify([...existingData, finishData])
          );

          setIsRunning(false);
          setIsPaused(false);
          postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_END);

          const path = flatRunningData.map(data => [
            data.latitude,
            data.longitude
          ]);
          const points = { type: 'LineString', coordinates: path };
          const pointCount = path.length;
          const postData = {
            summary: {
              totalDistanceMeter: totalDistance * 1000,
              durationSeconds: totalTime,
              avgSpeedMPS:
                totalTime > 0 ? (totalDistance * 1000) / totalTime : 0
            },
            track: {
              format: 'JSON',
              points: JSON.stringify(points),
              pointCount
            }
          };
          endRunningMutate({ postData });
          break;
      }
    },
    [
      runningData,
      averagePace,
      totalDistance,
      formattedTime,
      sessionStartTime,
      totalTime,
      endRunningMutate
    ]
  );

  const startWithRetry = async () => {
    startRunningMutate(undefined, {
      onError: initialError => {
        console.error('러닝 시작 실패, 재시도 중...', initialError);
        const points = { type: 'LineString', coordinates: [] };
        const postData = {
          summary: {
            totalDistanceMeter: 0,
            durationSeconds: 0,
            avgSpeedMPS: 0
          },
          track: {
            format: 'JSON',
            points: JSON.stringify(points),
            pointCount: 0
          }
        };
        endRunningMutate(
          { postData },
          {
            onSuccess: () => {
              console.log('이전 러닝 세션 종료 성공, 다시 시작 시도...');
              startRunningMutate();
            }
          }
        );
      }
    });
  };

  useEffect(() => {
    setIsRunning(true);
    setTargetDistance(localStorage.getItem('targetDistance') || '0');
    startWithRetry();
  }, []);

  const handleClickIndicator = () => {
    setCurrentPage(prev => (prev === 0 ? 1 : 0));
  };

  return {
    currentPage,
    runningData,
    isRunning,
    isPaused,
    totalDistance,
    currentSpeed,
    averagePace,
    remainingDistance,
    formattedTime,
    handleControl,
    handleClickIndicator,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};
