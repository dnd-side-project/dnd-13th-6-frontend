import React from 'react';
import Chart from './Chart';
import { RunRecord } from '@/types/runningTypes';
import { processRecordsForChart } from '@/utils/charts';

interface DistanceChartProps {
  records: RunRecord[];
}

export default function DistanceChart({ records }: DistanceChartProps) {
  const data = processRecordsForChart(records, record => record.distance / 1000);

  const maxValue = Math.max(...data.map(d => d.value), 0);
  const domainMax = Math.ceil(maxValue / 5) * 5;
  const ticks = Array.from({ length: domainMax / 5 + 1 }, (_, i) => i * 5);

  const yAxisTickFormatter = (value: number) => `${value}km`;

  const valueFormatter = (value: number) => {
    return `${value.toFixed(1)}km`;
  };

  const domain: [number, number] = [0, domainMax];

  return (
    <Chart
      title={'거리'}
      data={data}
      domain={domain}
      ticks={ticks}
      yAxisTickFormatter={yAxisTickFormatter}
      valueFormatter={valueFormatter}
    />
  );
}
