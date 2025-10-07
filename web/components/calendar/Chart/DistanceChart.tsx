import React from 'react';
import Chart from './Chart';
import { CalendarRecords } from '@/hooks/queries/calendar/useCalendarRecords';
import { processRecordsForChart } from '@/utils/charts';

interface DistanceChartProps {
  records: CalendarRecords['histories'];
}

export default function DistanceChart({ records }: DistanceChartProps) {
  const data = processRecordsForChart(records, record => record.distance);
  return <Chart title={'거리'} data={data} unit="km" />;
}
