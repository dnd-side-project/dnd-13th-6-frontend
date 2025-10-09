'use client';

import { useEffect, useRef } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

type LatLngLiteral = { lat: number; lng: number };

type PolylineProps = {
  paths: LatLngLiteral[][];
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
};

export default function Polyline({
  paths,
  strokeColor = '#32ff76',
  strokeOpacity = 1.0,
  strokeWeight = 10
}: PolylineProps) {
  const map = useMap();
  const maps = useMapsLibrary('maps');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!map || !maps) return;

    // 기존 폴리라인들 제거
    polylinesRef.current.forEach(p => p.setMap(null));
    polylinesRef.current = [];

    // 새 폴리라인들 생성
    const newPolylines = paths.map(path => {
      const newPolyline = new maps.Polyline({
        path,
        strokeColor,
        strokeOpacity,
        strokeWeight
      });
      newPolyline.setMap(map);
      return newPolyline;
    });

    polylinesRef.current = newPolylines;

    return () => {
      polylinesRef.current.forEach(p => p.setMap(null));
    };
  }, [map, maps, paths, strokeColor, strokeOpacity, strokeWeight]);

  return null;
}