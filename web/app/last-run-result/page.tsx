'use client';
import MainOverview from '@/components/running/OverView/MainOverview';
import 'react-circular-progressbar/dist/styles.css';
import CircleProgress from '@/components/running/Finish/CircleProgress';
import FinishOverView from '@/components/running/OverView/FinishOverView';
import RunningNameInput from '@/components/running/Finish/RunningNameInput';
import GoogleMap from '@/components/googleMap/GoogleMap';
import ReactConfetti from 'react-confetti';
import { useEffect, useState } from 'react';
import formatTo24H from '@/utils/time/formatTo24H';

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
  const [isClient, setIsClient] = useState(false);
  const [finishData, setFinishData] = useState<FinishData | null>(null);
  useEffect(() => {
    setIsClient(true);
    const data = localStorage.getItem('finishData');
    if (data) {
      setFinishData(JSON.parse(data) as FinishData);
    }
  }, []);

  // RN 에서는 latitude, longitude 맵에서는 lat, long 차이 해결
  const pathForMap = finishData?.runningData
    ? finishData.runningData.map(p => ({ lat: p.latitude, lng: p.longitude }))
    : [{ lat: 37.5665, lng: 126.978 }];

  return (
    <>
      {isClient && (
        <ReactConfetti
          numberOfPieces={200}
          recycle={false}
          style={{ zIndex: 9999 }}
        />
      )}
      <div className="relative flex flex-grow flex-col text-white">
        <div className="flex flex-col justify-around">
          <div className="flex items-center justify-around gap-8">
            <div className="flex flex-col items-start justify-center">
              <RunningNameInput />
              <MainOverview
                type={'finish'}
                distance={finishData?.totalDistance}
              />
            </div>
            <CircleProgress percent={82} />
          </div>
          <div className="mt-10">
            <FinishOverView
              averagePace={finishData?.averagePace}
              time={finishData?.totalTime}
              startTime={formatTo24H(finishData?.startTime || 0)}
            />
          </div>
        </div>
        {/*지도 55vh 아래*/}
        <div className="absolute right-0 bottom-0 left-0 h-[50vh]">
          <GoogleMap height="100%" path={pathForMap} />
        </div>
      </div>
    </>
  );
}
