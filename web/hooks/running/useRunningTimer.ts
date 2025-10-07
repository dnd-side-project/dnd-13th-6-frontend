'use client';
import { useState, useEffect, useRef } from 'react';

interface UseRunningTimerProps {
  isRunning: boolean;
  isPaused: boolean;
}

export const useRunningTimer = ({ isRunning, isPaused }: UseRunningTimerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartTime = useRef<number | null>(null); // Absolute start time of the session
  const pauseStartTime = useRef<number | null>(null); // When the pause began
  const totalPausedDuration = useRef(0); // Total time spent in pause

  useEffect(() => {
    if (isRunning) {
      if (sessionStartTime.current === null) {
        sessionStartTime.current = Date.now();
      }

      if (!isPaused) {
        // Resuming
        if (pauseStartTime.current) {
          totalPausedDuration.current += Date.now() - pauseStartTime.current;
          pauseStartTime.current = null;
        }

        intervalRef.current = setInterval(() => {
          if (sessionStartTime.current) {
            const now = Date.now();
            const runningDuration = now - sessionStartTime.current;
            const currentElapsedTime = Math.floor(
              (runningDuration - totalPausedDuration.current) / 1000
            );
            setElapsedTime(currentElapsedTime);
          }
        }, 1000);
      } else {
        // Pausing
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (pauseStartTime.current === null) {
          pauseStartTime.current = Date.now();
        }
      }
    } else {
      // Stopped
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setElapsedTime(0);
      sessionStartTime.current = null;
      pauseStartTime.current = null;
      totalPausedDuration.current = 0;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return {
    elapsedTime,
    formattedTime: formatTime(elapsedTime),
    sessionStartTime: sessionStartTime.current,
  };
};