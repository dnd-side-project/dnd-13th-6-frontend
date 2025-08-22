import React from 'react';
import ControlPanel from '@/components/running/Control/ControlPanel';
import GoogleMap from '@/components/googleMap/GoogleMap';
import { RunningData } from '@/types/runningTypes';

interface MapViewProps {
  onControl: (action: 'play' | 'pause' | 'stop' | 'resume') => void;
  isRunning: boolean;
  isPaused: boolean;
  runningData: RunningData[];
  time: string;
}

function MapView({
  onControl,
  isRunning,
  isPaused,
  runningData,
  time
}: MapViewProps) {
  const path = runningData.map(data => ({
    lat: data.latitude,
    lng: data.longitude
  }));

  return (
    <>
      {/* <GpsStatus /> */}
      <GoogleMap path={path} type="map" />
      <div className="absolute bottom-30 z-10 flex w-[calc(100%-2rem)] items-center justify-center">
        <ControlPanel
          type="map"
          onControl={onControl}
          isRunning={isRunning}
          isPaused={isPaused}
          time={time}
        />
      </div>
      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-50 bg-gradient-to-t from-black to-transparent" />
    </>
  );
}

export default MapView;
