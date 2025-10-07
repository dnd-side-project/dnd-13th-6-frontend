import React from 'react';
import Chart from './Chart';
import { RunRecord } from '@/types/runningTypes';
import { processRecordsForChart } from '@/utils/charts';

interface DistanceChartProps {
  records: RunRecord[];
}

export default function DistanceChart({ records }: DistanceChartProps) {
  const data = processRecordsForChart(records, record => record.distance);
  return <Chart title={'거리'} data={data} unit="km" />;
}
