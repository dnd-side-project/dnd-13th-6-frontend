'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  RunningData,
  StartRunningSuccessData,
  RunningErrorData
} from '@/types/runningTypes';
import { RUNNING_API } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { useStartRunning } from '@/hooks/queries/useStartRunning';
import { useEndRunning } from '@/hooks/queries/useEndRunning';
import { isAxiosError } from 'axios';
import api from '@/utils/apis/customAxios';
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
              totalDistanceMinutes: totalDistance,
              durationSeconds: totalTime,
              avgSpeedMPS: totalDistance / totalTime
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

  useEffect(() => {
    const initRunning = () => {
      const startRunMutationOptions = {
        onSuccess: (data: StartRunningSuccessData) => {
          const { runningId, runnerId } = data.result;
          const messageData = JSON.stringify({ runningId, runnerId });
          postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_START, messageData);
        },
        onError: async (error: Error) => {
          if (
            isAxiosError<RunningErrorData>(error) &&
            error.response?.data.code === 'R102'
          ) {
            console.log(
              'R102 Error: Existing run detected. Attempting to clear and retry.'
            );
            const existingRunningId =
              error.response?.data.result?.runningId ||
              localStorage.getItem('runningId');
            if (existingRunningId) {
              try {
                await api.delete(RUNNING_API.RUNNING_ACTIVE(existingRunningId));
                localStorage.removeItem('runningId');
                console.log(
                  'Existing run cleared. Retrying to start a new run...'
                );
                // Retry mutation once
                startRunningMutate(undefined, {
                  onSuccess: startRunMutationOptions.onSuccess, // reuse success handler
                  onError: (retryError: Error) => {
                    // If retry also fails, log it and stop to prevent loop.
                    console.error('Failed to start run on retry:', retryError);
                  }
                });
              } catch (deleteError) {
                console.error(
                  'Failed to delete existing running session:',
                  deleteError
                );
              }
            } else {
              console.error(
                'R102 error, but no existing runningId found to delete.'
              );
            }
          } else {
            console.error('Failed to start running session:', error);
          }
        }
      };

      setIsRunning(true);
      setIsPaused(false);
      setRunningData([[]]);
      setTargetDistance(localStorage.getItem('targetDistance') || '0');

      startRunningMutate(undefined, startRunMutationOptions);
    };

    initRunning();
  }, [startRunningMutate]);

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
