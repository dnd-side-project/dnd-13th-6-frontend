'use client';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import Polyline from '@/components/googleMap/Polyline';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import GpsStatus from '@/components/running/GpsStatus';

interface LatLng {
  lat: number;
  lng: number;
}

export default function GoogleMap({
  width = '100%',
  height = '100%',
  paths = [],
  type,
  children
}: {
  width?: string;
  height?: string;
  paths?: LatLng[][];
  type?: string;
  children?: React.ReactNode;
}) {
  const position = useMemo(() => {
    if (paths.length > 0) {
      const lastSegment = paths[paths.length - 1];
      if (lastSegment.length > 0) {
        return lastSegment[lastSegment.length - 1];
      }
    }
    return { lat: 37.5665, lng: 126.978 }; // Default to Seoul
  }, [paths]);

  const mapCenter = useMemo(() => {
    // Y-axis offset to move the center of the map down, thus moving the marker up.
    const latOffset = -0.001;
    return { lat: position.lat + latOffset, lng: position.lng };
  }, [position]);

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
    <>
      {type === 'map' ? (
        <GpsStatus onClick={() => setIsPanning(false)} />
      ) : (
        <></>
      )}
      <div style={{ width, height }}>
        <APIProvider apiKey={apiKey}>
          <Map
            zoom={isPanning ? undefined : 18}
            center={
              isPanning ? undefined : type === 'prepare' ? mapCenter : position
            }
            disableDefaultUI={true}
            gestureHandling="greedy"
            mapId="b585e0fdaac591c75d6f5085"
            style={{ height: '100%' }}
            colorScheme="DARK"
            onDragstart={handleDragStart}
            onDragend={handleDragEnd}
          >
            {paths.flat().length > 0 && (
              <>
                <AdvancedMarker position={position} title="My location">
                  <div
                    className="bg-primary h-6 w-6 rounded-full border-4 border-white"
                    style={{ transform: 'translateY(10px)' }}
                  />
                </AdvancedMarker>
                {children}
                <Polyline paths={paths} />
              </>
            )}
          </Map>
        </APIProvider>
      </div>
    </>
  );
}
