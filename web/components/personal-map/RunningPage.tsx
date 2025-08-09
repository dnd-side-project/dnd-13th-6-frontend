'use client';

import { LockKeyhole } from 'lucide-react';
import React, { useRef, useState } from 'react';
import ExerciseOverview from '@/components/personal-map/ExerciseOverview';
import ControlPanel from '@/components/personal-map/ControlPanel';
import PageControl from '@/components/common/PageControl';
import KakaoMap from '@/components/KakaoMap/KakaoMap';

export default function RunningPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipeAllowed = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    const edgeThreshold = 50; // 화면 가장자리 50px
    isSwipeAllowed.current = false;

    // 스와이프 시작 지점이 화면 가장자리인지 확인
    if (
      (currentPage === 0 &&
        touch.clientX > window.innerWidth - edgeThreshold) ||
      (currentPage === 1 && touch.clientX < edgeThreshold)
    ) {
      isSwipeAllowed.current = true;
      touchStartX.current = touch.clientX;
      touchEndX.current = touch.clientX; // 초기화
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipeAllowed.current) return;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwipeAllowed.current) return;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // 최소 스와이프 거리

    if (currentPage === 0 && swipeDistance > swipeThreshold) {
      // 통계 -> 지도 (왼쪽으로 스와이프)
      setCurrentPage(1);
    } else if (currentPage === 1 && swipeDistance < -swipeThreshold) {
      // 지도 -> 통계 (오른쪽으로 스와이프)
      setCurrentPage(0);
    }

    isSwipeAllowed.current = false;
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
        <div className="h-full w-1/2 px-4">
          <div className="flex h-full flex-col pb-16">
            {/* Top Status Indicators */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full bg-[#353535] px-3 py-1.5 text-sm backdrop-blur-sm">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span>GPS 연결됨</span>
                </div>
                <div className="rounded-full bg-[#353535] p-2 backdrop-blur-sm">
                  <LockKeyhole className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Main Metric Display */}
            <div className="flex flex-col items-center justify-center pt-16 text-center">
              <p className="pb-5 text-xl font-medium text-white/80">거리</p>
              <div className="flex items-baseline">
                <span className="text-9xl font-extrabold italic">1.06</span>
                <span className="ml-2 text-4xl font-semibold italic text-gray-500">
                  km
                </span>
              </div>
            </div>
            <div className="flex-grow" />
            {/* Exercise Overview */}
            <div className="mb-8 grid grid-cols-2 gap-y-8">
              <ExerciseOverview />
            </div>
            {/* Control Panel */}
            <div className="flex items-center justify-center mb-20">
              <ControlPanel />
            </div>
          </div>
        </div>
        {/* Map View */}
        <div className="relative h-full w-1/2">
          <div className="absolute top-4 left-4 z-10 flex w-[calc(100%-2rem)] items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full bg-[#353535] px-3 py-1.5 text-sm backdrop-blur-sm">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span>GPS 연결됨</span>
              </div>
              <div className="rounded-full bg-[#353535] p-2 backdrop-blur-sm">
                <LockKeyhole className="h-5 w-5" />
              </div>
            </div>
          </div>
          <KakaoMap />
        </div>
      </div>

      {/* Sticky PageControl */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        <PageControl
          pages={2}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
