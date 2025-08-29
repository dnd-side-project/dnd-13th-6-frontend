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
import api from '@/utils/apis/customAxios';
import { RUNNING_API } from '@/utils/apis/api';

type FinishData = {
  runningData: {
    latitude: number;
    longitude: number;
  }[];
  averagePace: string;
  totalDistance: number;
  totalTime: string;
  startTime: number;
};

export default function Page() {
  const navi = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [finishData, setFinishData] = useState<FinishData | null>(null);
  const [weeklyRunDistance, setWeeklyRunDistance] = useState<number>(0);
  const [targetDistance, setTargetDistance] = useState<number>(0);
  const getWeeklyRunDistance = async () => {
    try {
      const res = await api.get(RUNNING_API.WEEKLY_RUNNINGS());
      setWeeklyRunDistance(res.data.result.totalDistanceKm);
      console.log('뛴거리', res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    getWeeklyRunDistance();
    setTargetDistance(Number(localStorage.getItem('weeklyGoalDistance')));
    const data = localStorage.getItem('finishData');
    if (data) {
      setFinishData(JSON.parse(data) as FinishData);
    }
  }, []);

  // RN 에서는 latitude, longitude 맵에서는 lat, long 차이 해결
  const pathForMap = finishData?.runningData
    ? finishData.runningData.map(p => ({ lat: p.latitude, lng: p.longitude }))
    : [{ lat: 37.5665, lng: 126.978 }];

  const WeeklyRunPercent = () => {
    return weeklyRunDistance !== 0
      ? Math.floor((targetDistance / weeklyRunDistance) * 100)
      : 0;
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
                type={'finish'}
                distance={finishData?.totalDistance}
              />
            </div>
            <CircleProgress percent={WeeklyRunPercent()} />
          </div>
          <FinishOverView
            averagePace={finishData?.averagePace}
            time={finishData?.totalTime}
            startTime={formatTo24H(finishData?.startTime || 0)}
          />
        </div>
        {/*지도 55vh 아래*/}
        <div className="absolute right-0 bottom-0 left-0 h-[55vh]">
          <GoogleMap height="100%" path={pathForMap} />
        </div>

        {/*종료버튼*/}
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
