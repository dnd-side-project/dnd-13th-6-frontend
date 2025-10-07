import React from 'react';
import Chart from './Chart';
import { CalendarRecords } from '@/hooks/queries/calendar/useCalendarRecords';
import { processRecordsForChart } from '@/utils/charts';

interface TimeChartProps {
  records: CalendarRecords['histories'];
}

export default function TimeChart({ records }: TimeChartProps) {
  const data = processRecordsForChart(records, record => record.distance);

  return <Chart title={'시간'} data={data} unit="분" />;
}
