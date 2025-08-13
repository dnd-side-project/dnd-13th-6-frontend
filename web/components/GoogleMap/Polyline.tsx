'use client';

import { useEffect, useRef } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

type LatLngLiteral = { lat: number; lng: number };

type PolylineProps = {
  path: LatLngLiteral[];
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
};

export default function Polyline({
  path,
  strokeColor = '#32ff76',
  strokeOpacity = 1.0,
  strokeWeight = 15
}: PolylineProps) {
  const map = useMap();
  const maps = useMapsLibrary('maps');
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !maps) return;

    // 기존 폴리라인 제거
    polylineRef.current?.setMap(null);

    // 새 폴리라인 생성
    const newPolyline = new maps.Polyline({
      path,
      strokeColor,
      strokeOpacity,
      strokeWeight
    });

    newPolyline.setMap(map);
    polylineRef.current = newPolyline;

    return () => {
      newPolyline.setMap(null);
    };
  }, [map, maps, path, strokeColor, strokeOpacity, strokeWeight]);

  return null;
}
