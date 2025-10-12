import { RunRecord } from '@/types/runningTypes';

export const mockRunRecords: RunRecord[] = [
  {
    date: '2025-10-06',
    distance: 5000,
    duration: 600
  },
  {
    date: '2025-10-07',
    distance: 120, // 0.12km in meters
    duration: 7200 // 15 minutes in seconds
  },
  {
    date: '2025-10-08',
    distance: 2000, // 2km in meters
    duration: 1850 // 10 minutes in seconds
  },
  {
    date: '2025-10-09',
    distance: 8330, // 8km in meters
    duration: 1610 // 60 minutes in seconds
  },
  {
    date: '2025-10-10',
    distance: 4000, // 4km in meters
    duration: 1512 // 25 minutes in seconds
  },
  {
    date: '2025-10-11',
    distance: 6000, // 6km in meters
    duration: 2152 // 35 minutes in seconds
  },
  {
    date: '2025-10-12',
    distance: 13000, // 9km in meters
    duration: 3246 // 54 minutes in seconds
  }
];
