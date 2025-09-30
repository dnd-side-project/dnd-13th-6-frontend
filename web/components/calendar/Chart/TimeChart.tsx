import React from 'react';
import Chart from './Chart';

export default function TimeChart() {
  const data = [
    { name: '월', value: 30 },
    { name: '화', value: 45 },
    { name: '수', value: 25 },
    { name: '목', value: 60 },
    { name: '금', value: 35 },
    { name: '토', value: 50 },
    { name: '일', value: 70 }
  ];
  return <Chart title={'시간'} data={data} unit="분" />;
}
