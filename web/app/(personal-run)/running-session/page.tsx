'use client';

import React, { useRef, useState } from 'react';
import ExerciseOverview from '@/components/running/OverView/ExerciseOverview';
import ControlPanel from '@/components/running/Control/ControlPanel';
import PageControl from '@/components/common/PageControl';
import MapView from '@/components/running/MapView/MapView';
import GpsStatus from '@/components/running/GpsStatus';
import MainOverview from '@/components/running/OverView/MainOverview';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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
            <MainOverview />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-y-10">
            <ExerciseOverview />
          </div>
          <div className="flex flex-1/12 items-center justify-center">
            <ControlPanel />
          </div>
        </div>

        {/* Map View */}
        <div className="relative h-full w-1/2">
          <MapView />
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
