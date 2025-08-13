'use client';
import React, { useState } from 'react';
import ControlButton from '@/components/running/Control/ControlButton';
import { Pause, Play, Square } from 'lucide-react';
import { useRouter } from 'next/navigation';
import StopConfirmModal from '@/components/running/Control/StopConfirmModal';

interface ControlPanelProps {
  type?: string;
  time?: string;
  onControl: (action: 'play' | 'pause' | 'stop' | 'resume') => void;
  isRunning: boolean;
  isPaused: boolean;
}

function ControlPanel({
  type,
  time = '16:00',
  onControl,
  isRunning,
  isPaused
}: ControlPanelProps) {
  const [isStopModalOpen, setStopModalOpen] = useState(false);
  const router = useRouter();

  const handleStart = () => onControl('play');
  const handlePause = () => onControl('pause');
  const handleResume = () => onControl('resume');
  const handleStopClick = () => setStopModalOpen(true);

  const handleConfirmStop = () => {
    onControl('stop');
    router.replace('/run-finish');
    setStopModalOpen(false);
  };

  const handleCloseModal = () => {
    setStopModalOpen(false);
  };

  if (type === 'map') {
    return (
      <>
        <div className="flex items-center space-x-4">
          {isRunning && !isPaused ? (
            <button
              onClick={handlePause}
              className="flex h-[64px] items-center justify-center space-x-2 rounded-full bg-gray-70 px-6 py-3"
            >
              <Pause className="h-[36px] w-[36px] fill-gray-10 text-gray-10" />
              <span className="text-3xl font-bold text-gray-10">{time}</span>
            </button>
          ) : (
            <button
              onClick={isPaused ? handleResume : handleStart}
              className="flex h-[64px] items-center justify-center space-x-2 rounded-full bg-primary px-6 py-3"
            >
              <Play className="h-[36px] w-[36px] fill-[#1C1C1E] text-[#1C1C1E]" />
              <span className="text-3xl font-bold text-black">{time}</span>
            </button>
          )}
          <button
            onClick={handleStopClick}
            className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-gray-80"
          >
            <Square className="h-[25.6px] w-[25.6px] fill-white text-white" />
          </button>
        </div>
        <StopConfirmModal
          isOpen={isStopModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmStop}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex h-[20%] space-x-4">
        {isRunning && !isPaused ? (
          <ControlButton onClick={handlePause}>
            <Pause className="h-[35px] w-[35px] fill-black text-black" />
          </ControlButton>
        ) : (
          <ControlButton onClick={isPaused ? handleResume : handleStart}>
            <Play className="h-[35px] w-[35px] fill-black text-black" />
          </ControlButton>
        )}
        <ControlButton onClick={handleStopClick} type="stop">
          <Square className="h-[35px] w-[35px] fill-white text-white " />
        </ControlButton>
      </div>
      <StopConfirmModal
        isOpen={isStopModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmStop}
      />
    </>
  );
}

export default ControlPanel;
