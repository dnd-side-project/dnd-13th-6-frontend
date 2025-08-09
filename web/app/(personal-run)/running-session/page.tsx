import { LockKeyhole } from 'lucide-react';
import React from 'react';
import ExerciseOverview from '@/components/personal-map/ExerciseOverview';
import ControlPanel from '@/components/personal-map/ControlPanel';

export default function Page() {
  return (
    <div className="flex h-screen flex-col bg-background p-4 text-white">
      {/* Top Status Indicators */}
      <div className="flex items-center justify-between">
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
        <p className="text-xl font-medium text-white/80 pb-5">거리</p>
        <div className="flex items-baseline">
          <span className="text-9xl font-extrabold italic">1.06</span>
          <span className="ml-2 text-4xl font-semibold text-gray-500 italic">
            km
          </span>
        </div>
      </div>
      {/* Spacer */}
      <div className="flex-1/2" />
      <div className="grid grid-cols-2 gap-y-8">
        <ExerciseOverview />
      </div>
      {/* Spacer */}
      <div className="flex-1/7" />
      <div className="my-8 flex items-center justify-center">
        <ControlPanel />
      </div>
      {/* Spacer */}
      <div className="flex-1/5" />
    </div>
  );
}
