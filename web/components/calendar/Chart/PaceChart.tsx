import React from 'react';
import Chart from './Chart';
import { CalendarRecords } from '@/hooks/queries/calendar/useCalendarRecords';

interface PaceChartProps {
  records: CalendarRecords['histories'];
}

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export default function PaceChart({ records }: PaceChartProps) {
  const data = ['월', '화', '수', '목', '금', '토', '일'].map((name) => ({
    name,
    value: 0,
  }));

  records.forEach((record) => {
    const dayIndex = new Date(record.date).getDay();
    const dayName = dayOfWeek[dayIndex];
    const chartData = data.find((d) => d.name === dayName);
    if (chartData && record.distance > 0) {
      chartData.value = Math.round(record.duration / record.distance);
    }
  });

  const paceFormatter = (value: number) => {
    if (value === 0) return "0'00\"";
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes}'${seconds.toString().padStart(2, '0')}"`;
  };

  return <Chart title={'페이스'} data={data} valueFormatter={paceFormatter} />;
}