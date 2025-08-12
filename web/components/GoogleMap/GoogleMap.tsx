'use client';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import Polyline from '@/components/GoogleMap/Polyline';

interface LatLng {
  lat: number;
  lng: number;
}

export default function GoogleMap({
  width = '100%',
  height = '100%',
  path = []
}: {
  width?: string;
  height?: string;
  path?: LatLng[];
}) {
  const position = path.length > 0 ? path[path.length - 1] : { lat: 37.5665, lng: 126.9780 }; // Default to Seoul if path is empty
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
          zoom={17}
          center={position}
          disableDefaultUI={true}
          mapId="DEMO_MAP_ID"
          style={{ height: '100%' }}
          colorScheme="DARK"
        >
          {path.length > 0 && (
            <>
              <AdvancedMarker position={position} title="My location">
                <div className="w-6 h-6 border-4 border-white  rounded-full bg-primary" />
              </AdvancedMarker>
              <Polyline path={path} />
            </>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
