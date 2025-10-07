interface RunningData {
  latitude: number;
  longitude: number;
  distance: number;
  time: number;
  speed: number;
  timestamp: number;
}

interface EndRunningPostData {
  summary: {
    totalDistanceMinutes: number;
    durationSeconds: number;
    avgSpeedMPS: number;
  };
  track: {
    format: string;
    points: string;
    pointCount: number;
  };
}
//캘린더 쪽
interface RunRecord {
  date: string;
  distance: number;
  duration: number;
}

export type { RunningData, EndRunningPostData, RunRecord };
