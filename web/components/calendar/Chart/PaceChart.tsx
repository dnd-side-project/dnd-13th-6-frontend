import React from 'react';
import Chart from './Chart';
import { RunRecord } from '@/types/runningTypes';
import { processRecordsForChart } from '@/utils/charts';

interface PaceChartProps {
  records: RunRecord[];
}

export default function PaceChart({ records }: PaceChartProps) {
  const MAX_PACE = 960; // 16'00" in seconds
  const MIN_PACE = 180; // 3'00" in seconds

  const data = processRecordsForChart(records, record => {
    if (record.distance === 0 || record.duration === 0) return 0;
    const actualPace = record.duration / (record.distance / 1000);
    if (actualPace > MAX_PACE || actualPace < MIN_PACE) return 0;
    return MAX_PACE - actualPace;
  });

  const valueFormatter = (transformedValue: number) => {
    if (transformedValue === 0) return "";
    const actualPace = MAX_PACE - transformedValue;
    const minutes = Math.floor(actualPace / 60);
    const seconds = Math.round(actualPace % 60);
    return `${minutes}'${seconds.toString().padStart(2, '0')}\"`;
  };

  const yAxisTickFormatter = (transformedValue: number) => {
    const actualPace = MAX_PACE - transformedValue;
    const minutes = Math.floor(actualPace / 60);
    return `${minutes}'`;
  };

  const transformedDomainMax = MAX_PACE - MIN_PACE;
  const domain: [number, number] = [0, transformedDomainMax];

  const ticks = [];
  for (let p = MIN_PACE; p <= MAX_PACE; p += 60) {
    ticks.push(MAX_PACE - p);
  }

  return (
    <Chart
      title={'페이스'}
      data={data}
      valueFormatter={valueFormatter}
      yAxisTickFormatter={yAxisTickFormatter}
      domain={domain}
      ticks={ticks}
    />
  );
}
