import React from 'react';
import Chart from './Chart';
import { RunRecord } from '@/types/runningTypes';
import { processRecordsForChart } from '@/utils/charts';

interface PaceChartProps {
  records: RunRecord[];
}

export default function PaceChart({ records }: PaceChartProps) {
  const data = processRecordsForChart(records, record => {
    if (record.distance === 0) return 0;
    // 페이스 계산 (초/km)
    return record.duration / (record.distance / 1000);
  });

  const paceFormatter = (value: number) => {
    if (value === 0) return '0\'00"';
    const minutes = Math.floor(value / 60);
    const seconds = Math.round(value % 60);
    return `${minutes}'${seconds.toString().padStart(2, '0')}"`;
  };

  return <Chart title={'페이스'} data={data} valueFormatter={paceFormatter} />;
}
