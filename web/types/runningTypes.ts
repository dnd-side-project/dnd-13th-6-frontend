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

export type { RunningData, EndRunningPostData };
