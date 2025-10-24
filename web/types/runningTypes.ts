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
    totalDistanceMeter: number;
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

interface StartRunningSuccessData {
  result: {
    runningId: string;
    runnerId: string;
  };
}

interface RunningErrorData {
  code: string;
  message: string;
  result?: {
    runningId?: string;
  };
}

export type {
  RunningData,
  EndRunningPostData,
  RunRecord,
  StartRunningSuccessData,
  RunningErrorData
};
