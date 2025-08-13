'use client';
import MainOverview from '@/components/running/OverView/MainOverview';
import 'react-circular-progressbar/dist/styles.css';
import CircleProgress from '@/components/running/Finish/CircleProgress';
import FinishOverView from '@/components/running/OverView/FinishOverView';
import RunningNameInput from '@/components/running/Finish/RunningNameInput';
import GoogleMap from '@/components/GoogleMap/GoogleMap';
import { useRouter } from 'next/navigation';
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
  const navi = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [finishData, setFinishData] = useState<FinishData | null>(null);
  useEffect(() => {
    setIsClient(true);
    const data = localStorage.getItem('finishData');
    if (data) {
      window.alert(data);
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
      <div className="text-white min-h-screen flex flex-col relative">
        <div className="h-[45vh] p-4 flex flex-col justify-around">
          <div className="flex items-center justify-around gap-8">
            <div className="flex flex-col justify-center items-start">
              <RunningNameInput />
              <MainOverview
                type={'finish'}
                distance={finishData?.totalDistance}
              />
            </div>
            <CircleProgress percent={82} />
          </div>
          <FinishOverView
            averagePace={finishData?.averagePace}
            time={finishData?.totalTime}
            startTime={formatTo24H(finishData?.startTime || 0)}
          />
        </div>
        {/*지도 55vh 아래*/}
        <div className="absolute bottom-0 left-0 right-0 h-[55vh]">
          <GoogleMap height="100%" path={pathForMap} />
        </div>

        {/*종료버튼*/}
        <div className="absolute bottom-0 left-0 right-0 w-full p-4 bg-transparent">
          <button
            className="w-full bg-green-400 text-black font-semibold py-4 rounded-lg font-pretendard"
            onClick={() => navi.push('/lucky-stamp')}
          >
            <p className="text-lg">운동 종료하기</p>
          </button>
        </div>
      </div>
    </>
  );
}
