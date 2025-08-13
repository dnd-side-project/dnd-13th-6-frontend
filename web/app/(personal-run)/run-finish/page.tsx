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

export default function Page() {
  const navi = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
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
              <MainOverview type={'finish'} distance={1.06} />
            </div>
            <CircleProgress percent={82} />
          </div>
          <FinishOverView
            averagePace={`5\'32\'\' `}
            time="1:30"
            startTime="10:00"
          />
        </div>
        {/*지도 55vh 아래*/}
        <div className="absolute bottom-0 left-0 right-0 h-[55vh]">
          <GoogleMap height="100%" />
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
