'use client';

import React, { useEffect } from 'react';
import ExerciseOverview from '@/components/running/OverView/ExerciseOverview';
import ControlPanel from '@/components/running/Control/ControlPanel';
import PageControl from '@/components/common/PageControl';
import MapView from '@/components/running/MapView/MapView';
import MainOverview from '@/components/running/OverView/MainOverview';
import { useRunningSession } from '@/hooks/running/useRunningSession';

export default function Page() {
  const {
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
  } = useRunningSession();
  useEffect(() => {
    handleControl('play') 
  },[])
  return (
    <div
      className="bg-background relative h-screen w-full overflow-hidden text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {runningData?.length}
      <div
        className="flex h-full w-[200%] transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentPage * 50}%)` }}
      >
        <div className="flex h-full w-1/2 flex-col px-4 pb-4">
          <div className="flex flex-3/12 flex-col items-center justify-center text-center">
            {totalDistance && <MainOverview distance={totalDistance} /> }
          </div>
          <div className="mt-8 grid grid-cols-2 gap-y-10">
            <ExerciseOverview
              remainingDistance={remainingDistance}
              velocity={currentSpeed?.toFixed(1) || '0'}
              averagePace={averagePace}
              time={formattedTime}
            />
          </div>
          <div className="mb-10 flex flex-1/12 items-center justify-center">
            <ControlPanel
              onControl={handleControl}
              isRunning={isRunning}
              isPaused={isPaused}
            />
          </div>
        </div>

        <div className="relative h-full w-1/2">
          {/* <MapView
            onControl={handleControl}
            isRunning={isRunning}
            isPaused={isPaused}
            runningData={runningData}
            time={formattedTime}
          /> */}
        </div>
      </div>

      <div className="absolute right-0 bottom-15 left-0 z-10 flex justify-center">
        <PageControl
          pages={2}
          currentPage={currentPage}
          onClick={handleClickIndicator}
        />
      </div>
    </div>
  );
}
