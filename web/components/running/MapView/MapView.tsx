import React from 'react';
import GpsStatus from '@/components/running/GpsStatus';
import ControlPanel from '@/components/running/Control/ControlPanel';
import GoogleMap from '@/components/GoogleMap/GoogleMap';

function MapView() {
  return (
    <>
      <GpsStatus />
      <GoogleMap />
      <div className="absolute bottom-15  z-10 flex w-[calc(100%-2rem)] items-center justify-center">
        <ControlPanel type="map" />
      </div>
    </>
  );
}

export default MapView;
