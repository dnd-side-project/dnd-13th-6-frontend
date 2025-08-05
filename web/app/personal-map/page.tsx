'use client';

import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import Script from 'next/script';

export default function PersonalMap() {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_APP_KEY}&autoload=false`;

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{
          lat: 37.5665,
          lng: 126.978
        }}
        style={{
          width: '100vw',
          height: '100vh'
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
            lat: 37.5665,
            lng: 126.978
          }}
        />
        <Polyline
          strokeWeight={6}
          strokeColor="#007aff"
          strokeOpacity={0.9}
          path={[
            { lat: 37.5665, lng: 126.978 },
            { lat: 37.5666, lng: 126.9782 },
            { lat: 37.5667, lng: 126.9784 },
            { lat: 37.5668, lng: 126.9786 },
            { lat: 37.5669, lng: 126.9788 },
            { lat: 37.567, lng: 126.979 },
            { lat: 37.5671, lng: 126.9788 },
            { lat: 37.5673, lng: 126.9784 },
            { lat: 37.5674, lng: 126.9782 },
            { lat: 37.5675, lng: 126.978 },

            { lat: 37.5671, lng: 126.9772 },
            { lat: 37.567, lng: 126.977 },
            { lat: 37.5669, lng: 126.9768 },
            { lat: 37.5668, lng: 126.9766 }
          ]}
        />
      </Map>
    </>
  );
}
