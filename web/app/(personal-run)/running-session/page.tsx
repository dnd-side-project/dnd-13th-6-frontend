'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ExerciseOverview from '@/components/running/OverView/ExerciseOverview';
import ControlPanel from '@/components/running/Control/ControlPanel';
import PageControl from '@/components/common/PageControl';
import MapView from '@/components/running/MapView/MapView';
import GpsStatus from '@/components/running/GpsStatus';
import MainOverview from '@/components/running/OverView/MainOverview';
import { POST_MESSAGE_TYPE, SEND_MESSAGE_TYPE } from '@/utils/webView/consts';
import { RunningData } from '@/types/runningTypes';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [runningData, setRunningData] = useState<RunningData[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const startTime = useRef<number | null>(null); // 시작 시간을 저장할 useRef 추가

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalDistance = useMemo(
    () => runningData.reduce((acc, cur) => acc + cur.distance, 0) / 1000,
    [runningData]
  );

  const totalTime = useMemo(() => {
    if (runningData.length === 0) return 0;
    // 첫 데이터의 timestamp를 시작 시간으로 설정
    if (startTime.current === null) {
      startTime.current = runningData[0].timestamp;
    }
    const lastTimestamp = runningData[runningData.length - 1].timestamp;
    // 현재 시간 - 시작 시간 (밀리초)을 초 단위로 변환
    return Math.floor((lastTimestamp - startTime.current) / 1000);
  }, [runningData]);

  const currentSpeed = useMemo(
    () => (runningData.length ? runningData[runningData.length - 1].speed : 0),
    [runningData]
  );
  const averagePace = useMemo(() => {
    if (totalDistance === 0) return `0'00"`;
    const pace = totalTime / 60 / totalDistance;
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}'${seconds.toString().padStart(2, '0')}"`;
  }, [totalDistance, totalTime]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const postMessageToApp = (type: SEND_MESSAGE_TYPE, data?: any) => {
    if (window.ReactNativeWebView) {
      const message = JSON.stringify({ type, data });
      window.ReactNativeWebView.postMessage(message);
    }
  };
  //todo:테스트용

  // useEffect(() => {
  //   window.alert(`runningData:${runningData[0]?.latitude}`);
  // }, [runningData]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        window.alert(`runningData:${JSON.stringify(data)}`);
        console.log('Parsed message data:', data);
        if (data.type === POST_MESSAGE_TYPE.MESSAGE && data.message) {
          setRunningData(prev => [
            ...prev,
            { ...data.message, timestamp: data.timestamp }
          ]);
        } else {
          console.log(
            'Message type is not POST_MESSAGE_TYPE.MESSAGE or data is missing:',
            data
          );
        }
      } catch (error) {
        console.error('Error parsing message from React Native:', error);
      }
    };

    document.addEventListener('message', handleMessage);
    // web
    window.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('message', handleMessage);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // Minimum swipe distance

    if (swipeDistance > swipeThreshold) {
      // Swipe left
      setCurrentPage(prev => Math.min(prev + 1, 1));
    } else if (swipeDistance < -swipeThreshold) {
      // Swipe right
      setCurrentPage(prev => Math.max(prev - 1, 0));
    }
  };

  const handleClickIndicator = () => {
    setCurrentPage(prev => (prev === 0 ? 1 : 0));
  };

  const handleControl = (action: 'play' | 'pause' | 'stop' | 'resume') => {
    switch (action) {
      case 'play':
        setIsRunning(true);
        setIsPaused(false);
        postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_START);
        break;
      case 'pause':
        setIsPaused(true);
        postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_PAUSE);
        break;
      case 'resume':
        setIsPaused(false);
        postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_START); // or a new RESUME type
        break;
      case 'stop':
        setIsRunning(false);
        setIsPaused(false);
        postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_END);
        break;
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-background text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full w-[200%] transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentPage * 50}%)` }}
      >
        {/* Stats View */}
        <div className="flex h-full w-1/2 flex-col px-4 pb-4">
          <GpsStatus />
          <div className="flex flex-3/12 flex-col items-center justify-center text-center">
            <MainOverview distance={totalDistance} />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-y-10">
            <ExerciseOverview
              remainingDistance={totalDistance.toFixed(2)}
              velocity={currentSpeed.toFixed(1)}
              averagePace={averagePace}
              time={formatTime(totalTime)}
            />
          </div>
          <div className="flex flex-1/12 items-center justify-center">
            <ControlPanel
              onControl={handleControl}
              isRunning={isRunning}
              isPaused={isPaused}
            />
          </div>
        </div>

        {/* Map View */}
        <div className="relative h-full w-1/2">
          <MapView
            onControl={handleControl}
            isRunning={isRunning}
            isPaused={isPaused}
            runningData={runningData}
            time={formatTime(totalTime)}
          />
        </div>
      </div>

      {/* Sticky PageControl */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center">
        <PageControl
          pages={2}
          currentPage={currentPage}
          onClick={handleClickIndicator}
        />
      </div>
    </div>
  );
}
