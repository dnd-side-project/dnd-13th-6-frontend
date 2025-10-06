'use client';

import { useEffect, useState, useCallback } from 'react';
import { RunningData } from '@/types/runningTypes';
import { RUNNING_API } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { useStartRunning } from '@/hooks/queries/useStartRunning';
import { useEndRunning } from '@/hooks/queries/useEndRunning';
import { isAxiosError } from 'axios';
import api from '@/utils/apis/customAxios';
import { useRunningTimer } from '@/hooks/useRunningTimer';
import { useStompConnection } from '@/hooks/useStompConnection';
import { useRunningData } from '@/hooks/useRunningData';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { SEND_MESSAGE_TYPE } from '@/utils/webView/consts';

export const useRunningSession = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [runningData, setRunningData] = useState<RunningData[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [targetDistance, setTargetDistance] = useState('0');

  const { mutate: startRunningMutate, error: startRunningError } =
    useStartRunning();
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
    setRunningData(prev => [...prev, newPoint]);
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
          postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_START);
          break;
        case 'stop':
          const finishData = {
            runningData,
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

          const path = runningData.map(data => [data.latitude, data.longitude]);
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
          endRunningMutate({ runningId: runningId || '', postData });
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
    const initRunning = async () => {
      const runningId = localStorage.getItem('runningId');
      if (runningId) {
        try {
          await api.delete(RUNNING_API.RUNNING_ACTIVE(runningId));
          localStorage.removeItem('runningId');
        } catch (error) {
          console.error('Error deleting running active:', error);
        }
      }

      setIsRunning(true);
      setIsPaused(false);
      setTargetDistance(localStorage.getItem('targetDistance') || '0');

      startRunningMutate(undefined, {
        onSuccess: data => {
          const { runningId, runnerId } = data.result;
          const messageData = JSON.stringify({ runningId, runnerId });
          postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_START, messageData);
        }
      });
    };

    initRunning();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startRunningMutate]);

  useEffect(() => {
    const deleteRunningActive = async () => {
      if (startRunningError) {
        handleControl('stop');
        if (
          isAxiosError(startRunningError) &&
          startRunningError.response?.data.code === 'R102'
        ) {
          await api
            .delete(
              RUNNING_API.RUNNING_ACTIVE(
                localStorage.getItem('runningId') || ''
              )
            )
            .then(() => {
              handleControl('stop');
              startRunningMutate();
            });
          return;
        }
      }
    };
    deleteRunningActive();
  }, [startRunningError, handleControl, startRunningMutate]);

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
