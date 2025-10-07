import React from 'react';
import Chart from './Chart';
import { CalendarRecords } from '@/hooks/queries/calendar/useCalendarRecords';

interface TimeChartProps {
  records: CalendarRecords['histories'];
}

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export default function TimeChart({ records }: TimeChartProps) {
  const data = ['월', '화', '수', '목', '금', '토', '일'].map((name) => ({
    name,
    value: 0,
  }));

  records.forEach((record) => {
    const dayIndex = new Date(record.date).getDay();
    const dayName = dayOfWeek[dayIndex];
    const chartData = data.find((d) => d.name === dayName);
    if (chartData) {
      chartData.value = Math.round(record.duration / 60);
    }
  });

  return <Chart title={'시간'} data={data} unit="분" />;
}