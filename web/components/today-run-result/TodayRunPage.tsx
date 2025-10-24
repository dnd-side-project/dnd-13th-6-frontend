'use client';
import MainOverview from '@/components/running/OverView/MainOverview';
import 'react-circular-progressbar/dist/styles.css';
import FinishOverView from '@/components/running/OverView/FinishOverView';
import RunningNameInput from '@/components/running/Finish/RunningNameInput';
import GoogleMap from '@/components/googleMap/GoogleMap';
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

// 👇 Props를 받는 방식을 수정했습니다.
type TodayRunPageProps = {
  finishData: FinishData;
};

export default function TodayRunPage({ finishData }: TodayRunPageProps) {
  // RN 에서는 latitude, longitude 맵에서는 lat, long 차이 해결
  let path: { lat: number; lng: number }[] = [];
  if (finishData?.runningData) {
    path = finishData.runningData.map(data => ({
      lat: data.latitude,
      lng: data.longitude
    }));
  }

  return (
    <>
      <div className="relative flex flex-grow flex-col text-white">
        <div className="flex flex-col justify-around">
          <div className="flex items-center justify-around gap-8">
            <div className="flex flex-col items-start justify-center">
              <MainOverview
                type={'finish'}
                distance={
                  finishData?.totalDistance
                    ? Number((finishData?.totalDistance / 1000).toFixed(2))
                    : 0
                }
              />
            </div>
          </div>
          <div className="mt-10 mb-10">
            <FinishOverView
              averagePace={finishData?.averagePace}
              time={finishData?.totalTime}
              startTime={formatTo24H(finishData?.startTime || 0)}
            />
          </div>
        </div>
        {/*지도 55vh 아래*/}
        {/* Removed absolute positioning to allow the map to flow naturally below other content. */}
        <div className="h-[50vh]">
          <GoogleMap height="100%" paths={[path]} type={'todayResult'} />
        </div>
      </div>
    </>
  );
}
