const API_SUFFIX = 'api';
export const API_VERSION_PREFIX = 'api/v1';

export const MODULE = {
  AUTH: `auth`,
  USERS: 'users',
  CREWS: `crews`,
  GOALS: 'goals',
  REWARDS: 'rewards',
  PUSH: 'push',
  RUNS: 'runs',
  RUNNER: 'runner',
  RUNNINGS: 'runnings',
  CALENDAR: 'calendar'
} as const;

// ✅ 모듈별 API 타입 정의
interface APIDefinitions {
  CREWS: {
    GET_CREW_LIST: () => string;
    CREATE_CREW: () => string;
    JOIN_CREW: () => string;
    GET_CREW_DETAIL: (crewId: number) => string;
  };
  // ✅ 다른 모듈도 여기에 추가 가능
  // AUTH: { LOGIN: () => string; LOGOUT: () => string; }
}

// ✅ API_END_POINT 타입 = MODULE의 key 중에서 정의된 API만 포함
export const API_END_POINT: { [K in keyof APIDefinitions]: APIDefinitions[K] } =
  {
    CREWS: {
      GET_CREW_LIST: () => `${API_SUFFIX}/${MODULE.CREWS}`,
      CREATE_CREW: () => `${API_SUFFIX}/${MODULE.CREWS}`,
      JOIN_CREW: () => `${API_SUFFIX}/${MODULE.CREWS}/join`,
      GET_CREW_DETAIL: (crewId: number) =>
        `${API_SUFFIX}/${MODULE.CREWS}/${crewId}`
    }
  };

export const AUTH_API = {
  SIGN_UP: () => `/api/auth/signup/complete`,
  LOG_OUT: () => `/api/auth/logout`,
  REFRESH_TOKEN: () => `/api/auth/token/refresh`
} as const;

export const MEMBER_API = {
  CHANGE_NICKNAME: () => `/api/members/me/nickname`,
  CHANGE_BADGE: () => `/api/members/me/badge`,
  MY_BADGE: (memberId: string | number) => `/api/members/${memberId}/badge`,
  MY_INFO: () => `/api/members/me`
};
export const NOTIFICATION_API = {
  NOTIFICATION_LIST: () => `/api/notifications/recent`
};
export const REWARD_API = {
  CLOVER: () => `/api/rewards/clovers`,
  BADGE_LIST: () => `/api/rewards/badges`
};
export const RUNNING_API = {
  RUNNING_END: (runningId: string) => `/api/runnings/${runningId}/end`,
  RUNNING_START: () => `/api/runnings/start`
};

export const SOCKET_URL = {
  RUNNING_PUBLISH: (runningId: string | number) =>
    `/app/runnings/${runningId}/location`,
  RUNNING_SUBSCRIBE: (runningId: string | number) =>
    `/topic/runnings/${runningId}`
};
