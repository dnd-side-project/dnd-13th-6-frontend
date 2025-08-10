// components/GoogleMap/Polyline.tsx
'use client';

import { useEffect, useState } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

// google.maps.LatLngLiteral 타입을 명시적으로 정의하거나 import해야 합니다.
// 여기서는 간단하게 인라인으로 타입을 정의합니다.
type LatLngLiteral = {
  lat: number;
  lng: number;
};

type PolylineProps = {
  path: LatLngLiteral[];
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
};

export default function Polyline({
  path,
  strokeColor = '#32ff76', // 선 색상
  strokeOpacity = 1.0, // 선 투명도
  strokeWeight = 15 // 선
}: PolylineProps) {
  const map = useMap(); // 현재 맵 인스턴스를 가져옵니다.
  const maps = useMapsLibrary('maps'); // Google Maps 핵심 라이브러리를 로드합니다.
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    // 맵과 라이브러리가 준비되지 않았으면 아무것도 하지 않습니다.
    if (!map || !maps) {
      return;
    }

    // 기존 폴리라인이 있으면 지도에서 제거합니다.
    if (polyline) {
      polyline.setMap(null);
    }

    // 새로운 Polyline 인스턴스를 생성합니다.
    const newPolyline = new maps.Polyline({
      path,
      strokeColor,
      strokeOpacity,
      strokeWeight
    });

    // 생성된 폴리라인을 지도에 추가합니다.
    newPolyline.setMap(map);
    setPolyline(newPolyline);

    //cleanup
    return () => {
      newPolyline.setMap(null);
    };
  }, [map, maps, path, strokeColor, strokeOpacity, strokeWeight]);

  return null;
}
