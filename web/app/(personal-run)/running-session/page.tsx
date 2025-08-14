'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ExerciseOverview from '@/components/running/OverView/ExerciseOverview';
import ControlPanel from '@/components/running/Control/ControlPanel';
import PageControl from '@/components/common/PageControl';
import MapView from '@/components/running/MapView/MapView';
import MainOverview from '@/components/running/OverView/MainOverview';
import { SEND_MESSAGE_TYPE } from '@/utils/webView/consts';
import { RunningData } from '@/types/runningTypes';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [runningData, setRunningData] = useState<RunningData[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간을 초 단위로 저장
  const startTime = useRef<number | null>(null); // 시작 시간을 저장할 useRef 추가
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // setInterval ID를 저장할 useRef
  const [targetDistance, setTargetDistance] = useState('0');

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipeActive = useRef(false);

  //받아온 데이터 처리
  const totalDistance = useMemo(() => {
    const sum =
      runningData.reduce((acc, cur) => acc + Number(cur.distance), 0) / 1000;
    return Math.round(sum * 100) / 100;
  }, [runningData]);

  const totalTime = useMemo(() => {
    return elapsedTime;
  }, [elapsedTime]);

  const currentSpeed = () => {
    return runningData.length ? runningData[runningData.length - 1].speed : 0;
  };

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
  const remainingDistance = () => {
    try {
      if (targetDistance !== '0') {
        return (parseFloat(targetDistance) - totalDistance).toFixed(2);
      }
      return '0';
    } catch (e) {
      console.log(e);
      return '0';
    }
  };
  const postMessageToApp = (type: SEND_MESSAGE_TYPE, data?: string) => {
    if (window.ReactNativeWebView) {
      const message = JSON.stringify({ type, data });
      window.ReactNativeWebView.postMessage(message);
    }
  };
  //todo:테스트용
  //시간 계산
  useEffect(() => {
    if (isRunning && !isPaused) {
      if (startTime.current === null) {
        startTime.current = Date.now();
      }
      intervalRef.current = setInterval(() => {
        setElapsedTime(
          Math.floor((Date.now() - (startTime.current || Date.now())) / 1000)
        );
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  //이벤트 등록
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Parsed message data:', data);
        if (data) {
          setRunningData(prev => [
            ...prev,
            { ...data.message, timestamp: data.timestamp }
          ]);
        }
      } catch (error) {
        console.error('error:', error);
      }
    };
    // Android
    document.addEventListener('message', handleMessage as EventListener);
    // iOS
    window.addEventListener('message', handleMessage);
    return () => {
      //Android
      document.removeEventListener('message', handleMessage as EventListener);
      //iOS
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  //화면 슬라이드 범위
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.targetTouches[0].clientX;
    const screenWidth = window.innerWidth;
    const activationZoneWidth = screenWidth * 0.2; // 20% of screen width on each side

    if (
      touchX < activationZoneWidth ||
      touchX > screenWidth - activationZoneWidth
    ) {
      isSwipeActive.current = true;
      touchStartX.current = touchX;
      touchEndX.current = touchX; // Initialize touchEndX
    } else {
      isSwipeActive.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isSwipeActive.current) {
      touchEndX.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    if (isSwipeActive.current) {
      const swipeDistance = touchStartX.current - touchEndX.current;
      const swipeThreshold = 50; // 최소 슬라이드 거리

      if (swipeDistance > swipeThreshold) {
        // Swipe left
        setCurrentPage(prev => Math.min(prev + 1, 1));
      } else if (swipeDistance < -swipeThreshold) {
        // Swipe right
        setCurrentPage(prev => Math.max(prev - 1, 0));
      }
    }
    isSwipeActive.current = false; // Reset on touch end
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
        const finishData = {
          runningData,
          averagePace: averagePace,
          totalDistance: totalDistance,
          totalTime: formatTime(totalTime),
          startTime: startTime.current || 0
        };
        localStorage.setItem('finishData', JSON.stringify(finishData));
        setIsRunning(false);
        setIsPaused(false);
        postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_END);
        break;
    }
  };
  //버튼
  useEffect(() => {
    handleControl('play');
    setTargetDistance(localStorage.getItem('targetDistance') || '0');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          {/* <GpsStatus /> */}
          <div className="flex flex-3/12 flex-col items-center justify-center text-center">
            <MainOverview distance={totalDistance} />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-y-10">
            <ExerciseOverview
              remainingDistance={remainingDistance()}
              velocity={currentSpeed().toFixed(1)}
              averagePace={averagePace}
              time={formatTime(totalTime)}
            />
          </div>
          <div className="flex flex-1/12 items-center justify-center mb-5">
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
      <div className="absolute bottom-15 left-0 right-0 z-10 flex justify-center">
        <PageControl
          pages={2}
          currentPage={currentPage}
          onClick={handleClickIndicator}
        />
      </div>
    </div>
  );
}
