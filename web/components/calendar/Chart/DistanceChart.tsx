import React from 'react';
import Chart from './Chart';

export default function DistanceChart() {
  const data = [
    { name: '월', value: 10 },
    { name: '화', value: 18 },
    { name: '수', value: 13 },
    { name: '목', value: 21 },
    { name: '금', value: 12 },
    { name: '토', value: 13 },
    { name: '일', value: 14 }
  ];
  return <Chart title={'거리'} data={data} unit="km" />;
}
