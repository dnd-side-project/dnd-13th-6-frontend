import React from 'react';
import Chart from './Chart';
import { RunRecord } from '@/types/runningTypes';
import { processRecordsForChart } from '@/utils/charts';

interface TimeChartProps {
  records: RunRecord[];
}

export default function TimeChart({ records }: TimeChartProps) {
  const data = processRecordsForChart(records, record => record.duration / 60);
  const yAxisTickFormatter = (value: number) => `${value}분`;
  const timeFormatter = (value: number) => {
    return `${Math.round(value)}분`;
  };

  return (
    <Chart
      title={'시간'}
      data={data}
      valueFormatter={timeFormatter}
      yAxisTickFormatter={yAxisTickFormatter}
    />
  );
}
