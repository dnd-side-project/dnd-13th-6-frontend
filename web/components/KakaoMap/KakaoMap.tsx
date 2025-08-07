'use client';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { DummyGPSData } from '@/components/KakaoMap/DummyGPSData';

export default function KakaoMap({
  width = '100vw',
  height = '100vh'
}: {
  width?: string;
  height?: string;
}) {
  return (
    <Map
      center={{
        lat: 37.5665,
        lng: 126.978
      }}
      style={{
        width,
        height
      }}
      level={3}
    >
      <MapMarker
        image={{
          src: '/assets/Round_LOGO.png',
          size: {
            width: 40,
            height: 40
          },
          options: {
            shape: 'circle',
            offset: {
              x: 20,
              y: 20
            }
          }
        }}
        position={{
          lat: DummyGPSData[0].lat,
          lng: DummyGPSData[0].lng
        }}
      />
      <Polyline
        strokeWeight={6}
        strokeColor="#007aff"
        strokeOpacity={0.9}
        path={DummyGPSData}
      />
    </Map>
  );
}
