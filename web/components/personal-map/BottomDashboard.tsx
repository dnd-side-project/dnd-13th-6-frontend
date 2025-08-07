'use client';
import { useRouter } from 'next/navigation';

import { Pause, Play, Square } from 'lucide-react';
import { useState } from 'react';
import ControlButton from '@/components/personal-map/ControlButton';
import ExerciseOverview from '@/components/personal-map/ExerciseOverview';

export function BottomDashboard() {
  const [runningState, setRunningState] = useState<'play' | 'pause' | 'stop'>(
    'play'
  );
  const router = useRouter();

  const handleStart = () => {
    setRunningState('play');
  };
  const handlePause = () => {
    setRunningState('pause');
  };
  const handleStop = () => {
    setRunningState('stop');
    router.replace('/run-finish');
  };
  return (
    <div className="h-[50vh] p-4">
      {/* 2x2 그리드 영역 */}
      <div className="h-[50%]">
        <ExerciseOverview />
      </div>

      {/* 추가 내용 영역 */}
      <div className="mt-4 flex h-[35%] items-center justify-center space-x-4">
        {runningState === 'pause' ? (
          <div className="flex space-x-4 h-[20%]">
            <ControlButton onClick={handleStart}>
              <Play className="h-[35px] w-[35px] fill-[var(--primary)] text-[var(--primary)]" />
            </ControlButton>
            <ControlButton onClick={handleStop}>
              <Square className="h-[35px] w-[35px] fill-[var(--primary)] text-[var(--primary)]" />
            </ControlButton>
          </div>
        ) : (
          <div className="flex space-x-4 h-[20%]">
            <ControlButton onClick={handlePause}>
              <Pause className="h-[35px] w-[35px] fill-[var(--primary)] text-[var(--primary)]" />
            </ControlButton>
            <ControlButton onClick={handleStop}>
              <Square className="h-[35px] w-[35px] fill-[var(--primary)] text-[var(--primary)]" />
            </ControlButton>
          </div>
        )}
      </div>
    </div>
  );
}
