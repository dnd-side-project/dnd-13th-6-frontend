import { POST_MESSAGE_TYPE } from '@/utils/webView/consts';

interface RunningData {
  latitude: number;
  longitude: number;
  distance: number;
  time: number;
  speed: number;
  timestamp: number;
}

type RunningMessagePacket = {
  type: POST_MESSAGE_TYPE;
  data: RunningData[];
  timestamp: number;
};

export type { RunningData, RunningMessagePacket };
