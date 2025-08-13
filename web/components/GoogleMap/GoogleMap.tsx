'use client';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import Polyline from '@/components/GoogleMap/Polyline';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const position = useMemo(
    () =>
      path.length > 0 ? path[path.length - 1] : { lat: 37.5665, lng: 126.978 }, // Default to Seoul
    [path]
  );

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [isPanning, setIsPanning] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleDragStart = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    setIsPanning(true);
  };

  const handleDragEnd = () => {
    debounceTimer.current = setTimeout(() => {
      setIsPanning(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  //api 키 체크
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

  const polyline = path.slice(0, path.length - 1);
  return (
    <div style={{ width, height }}>
      <APIProvider apiKey={apiKey}>
        <Map
          zoom={isPanning ? null : 18}
          center={isPanning ? null : position}
          disableDefaultUI={true}
          gestureHandling="greedy"
          mapId="DEMO_MAP_ID"
          style={{ height: '100%' }}
          colorScheme="DARK"
          onDragstart={handleDragStart}
          onDragend={handleDragEnd}
        >
          {path.length > 0 && (
            <>
              <AdvancedMarker position={position} title="My location">
                <div
                  className="w-6 h-6 border-4 border-white  rounded-full bg-primary"
                  style={{ transform: 'translateY(10px)' }}
                />
              </AdvancedMarker>
              <Polyline path={polyline} />
            </>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
