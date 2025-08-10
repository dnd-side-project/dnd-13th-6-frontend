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
      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-50 bg-gradient-to-t from-black to-transparent" />
    </>
  );
}

export default MapView;
