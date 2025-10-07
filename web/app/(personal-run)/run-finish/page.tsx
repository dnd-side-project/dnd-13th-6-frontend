'use client';
import MainOverview from '@/components/running/OverView/MainOverview';
import 'react-circular-progressbar/dist/styles.css';
import CircleProgress from '@/components/running/Finish/CircleProgress';
import FinishOverView from '@/components/running/OverView/FinishOverView';
import RunningNameInput from '@/components/running/Finish/RunningNameInput';
import GoogleMap from '@/components/googleMap/GoogleMap';
import { useRouter } from 'next/navigation';
import ReactConfetti from 'react-confetti';
import { useEffect, useState } from 'react';
import formatTo24H from '@/utils/time/formatTo24H';
import Button from '@/components/common/Button';
import { useWeeklyRunDistance } from '@/hooks/queries/useWeeklyRunDistance';
import { useFinishData } from '@/hooks/running/useFinishData';

export default function Page() {
  const navi = useRouter();
  const { latestFinishData, pathForMap, isClient } = useFinishData();
  const { data: weeklyRunDistance } = useWeeklyRunDistance();
  const [targetDistance, setTargetDistance] = useState<number>(0);

  useEffect(() => {
    setTargetDistance(Number(localStorage.getItem('weeklyGoalDistance')));
  }, []);

  const weeklyRunPercent = () => {
    if (!targetDistance || !latestFinishData) {
      return 0;
    }
    const totalDistance =
      (weeklyRunDistance || 0) + latestFinishData.totalDistance / 1000;
    return Math.floor((totalDistance / targetDistance) * 100);
  };

  return (
    <>
      {isClient && (
        <ReactConfetti
          numberOfPieces={200}
          recycle={false}
          style={{ zIndex: 9999 }}
        />
      )}
      <div className="relative flex min-h-screen flex-col text-white">
        <div className="flex h-[45vh] flex-col justify-around p-4">
          <div className="flex items-center justify-around gap-8">
            <div className="flex flex-col items-start justify-center">
              <RunningNameInput />
              <MainOverview
                type="finish"
                distance={latestFinishData?.totalDistance}
              />
            </div>
            <CircleProgress percent={weeklyRunPercent()} />
          </div>
          <FinishOverView
            averagePace={latestFinishData?.averagePace}
            time={latestFinishData?.totalTime}
            startTime={formatTo24H(latestFinishData?.startTime || 0)}
          />
        </div>

        <div className="absolute right-0 bottom-0 left-0 h-[55vh]">
          <GoogleMap height="100%" path={pathForMap} />
        </div>

        <div className="absolute right-0 bottom-0 left-0 w-full bg-transparent p-4">
          <Button
            onClickAction={() => navi.push('/lucky-stamp')}
            className="mb-5 h-15 w-full"
          >
            운동종료하기
          </Button>
        </div>
      </div>
    </>
  );
}
