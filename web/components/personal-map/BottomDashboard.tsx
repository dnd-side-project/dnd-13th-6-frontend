'use client';
import { Pause, Play, Square } from 'lucide-react';
import { useState } from 'react';
import DashBoardItem from '@/components/personal-map/DashBoardItem';
import ControlButton from '@/components/personal-map/ControlButton';

export function BottomDashboard() {
  const [runningState, setRunningState] = useState<'play' | 'pause' | 'stop'>(
    'play'
  );
  const handleStart = () => {
    setRunningState('play');
  };
  const handlePause = () => {
    setRunningState('pause');
  };
  const handleStop = () => {
    setRunningState('stop');
  };
  return (
    <div className="h-[50vh] p-4">
      {/* 2x2 그리드 영역 */}
      <div className="grid h-[65%] grid-cols-2 grid-rows-2 gap-4">
        <DashBoardItem title="남은거리" value="2.00km" />
        <DashBoardItem title="거리" value="1.00km" />
        <DashBoardItem title="평균 페이스" value="- '--'" />
        <DashBoardItem title="칼로리" value="104" />
      </div>

      {/* 추가 내용 영역 */}
      <div className="mt-4 flex h-[35%] items-center justify-center space-x-4">
        {runningState === 'pause' ? (
          <div className="flex space-x-4">
            <ControlButton onClick={handleStart}>
              <Play className="h-[35px] w-[35px] fill-[var(--primary)] text-[var(--primary)]" />
            </ControlButton>
            <ControlButton onClick={handleStop}>
              <Square className="h-[35px] w-[35px] fill-[var(--primary)] text-[var(--primary)]" />
            </ControlButton>
          </div>
        ) : (
          <div className="flex space-x-4">
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
