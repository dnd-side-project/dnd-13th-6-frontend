'use client';
import React, { useState } from 'react';
import ControlButton from '@/components/personal-map/ControlButton';
import { Pause, Play, Square } from 'lucide-react';
import { useRouter } from 'next/navigation';

function ControlPanel() {
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
    <>
      {runningState === 'pause' ? (
        <div className="flex space-x-4 h-[20%]">
          <ControlButton onClick={handleStart}>
            <Play className="h-[35px] w-[35px] fill-black text-black" />
          </ControlButton>
          <ControlButton onClick={handleStop}>
            <Square className="h-[35px] w-[35px] fill-black text-black" />
          </ControlButton>
        </div>
      ) : (
        <div className="flex space-x-4 h-[20%]">
          <ControlButton onClick={handlePause}>
            <Pause className="h-[35px] w-[35px] fill-black text-black" />
          </ControlButton>
          <ControlButton onClick={handleStop}>
            <Square className="h-[35px] w-[35px] fill-black text-black " />
          </ControlButton>
        </div>
      )}
    </>
  );
}

export default ControlPanel;
