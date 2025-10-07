import React from 'react';
import Chart from './Chart';
import { CalendarRecords } from '@/hooks/queries/calendar/useCalendarRecords';

interface DistanceChartProps {
  records: CalendarRecords['histories'];
}

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export default function DistanceChart({ records }: DistanceChartProps) {
  const data = ['월', '화', '수', '목', '금', '토', '일'].map((name) => ({
    name,
    value: 0,
  }));

  records.forEach((record) => {
    const dayIndex = new Date(record.date).getDay();
    const dayName = dayOfWeek[dayIndex];
    const chartData = data.find((d) => d.name === dayName);
    if (chartData) {
      chartData.value = record.distance;
    }
  });

  return <Chart title={'거리'} data={data} unit="km" />;
}