'use client';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { DummyGPSData } from '@/components/GoogleMap/DummyGPSData';
import Polyline from '@/components/GoogleMap/Polyline';

export default function GoogleMap({
  width = '100%',
  height = '100%'
}: {
  width?: string;
  height?: string;
}) {
  const position = DummyGPSData[0];
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div
        style={{
          width,
          height,
          backgroundColor: '#333',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <p style={{ color: 'white', textAlign: 'center' }}>
          Google Maps API key is missing. <br />
          Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment
          variables.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width, height }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={17}
          defaultCenter={position}
          disableDefaultUI={true}
          mapId="DEMO_MAP_ID"
          style={{ height: '100%' }}
          colorScheme="DARK"
        >
          <AdvancedMarker position={position} title="My location">
            <div className="w-6 h-6 border-4 border-white  rounded-full bg-primary" />
          </AdvancedMarker>
          <Polyline path={DummyGPSData.slice(1)} />
        </Map>
      </APIProvider>
    </div>
  );
}
