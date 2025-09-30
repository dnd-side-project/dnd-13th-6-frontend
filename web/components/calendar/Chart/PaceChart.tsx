import React from 'react';
import Chart from './Chart';

export default function PaceChart() {
  // Pace in seconds per km
  const data = [
    { name: '월', value: 330 }, // 5'30"
    { name: '화', value: 320 }, // 5'20"
    { name: '수', value: 340 }, // 5'40"
    { name: '목', value: 310 }, // 5'10"
    { name: '금', value: 335 }, // 5'35"
    { name: '토', value: 325 }, // 5'25"
    { name: '일', value: 315 }  // 5'15"
  ];

  const paceFormatter = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes}'${seconds.toString().padStart(2, '0')}"`;
  };

  return <Chart title={'페이스'} data={data} valueFormatter={paceFormatter} />;
}
