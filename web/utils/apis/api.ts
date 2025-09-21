const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';
const API_SUFFIX = 'api';
export const API_VERSION_PREFIX = isDev ? '/dev/api/v1' : '/api/v1';

export const MODULE = {
  AUTH: `auth`,
  USERS: 'users',
  MEMBERS: 'members',
  NOTIFICATIONS: 'notifications',
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
  SIGN_UP: () => `/${API_SUFFIX}/${MODULE.AUTH}/signup/complete`,
  LOG_OUT: () => `/${API_SUFFIX}/${MODULE.AUTH}/logout`,
  REFRESH_TOKEN: () => `/${API_SUFFIX}/${MODULE.AUTH}/token/refresh`,
  WITHDRAW: () => `/${API_SUFFIX}/${MODULE.AUTH}/${MODULE.MEMBERS}me`
} as const;

export const MEMBER_API = {
  CHANGE_NICKNAME: () => `/${API_SUFFIX}/${MODULE.MEMBERS}/me/nickname`,
  CHANGE_BADGE: () => `/${API_SUFFIX}/${MODULE.MEMBERS}/me/badge`,
  MY_BADGE: (memberId: string | number) =>
    `/${API_SUFFIX}/${MODULE.MEMBERS}/${memberId}/badge`,
  MY_INFO: () => `/${API_SUFFIX}/${MODULE.MEMBERS}/me`
};
export const NOTIFICATION_API = {
  NOTIFICATION_LIST: () => `/${API_SUFFIX}/${MODULE.NOTIFICATIONS}/recent`
};
export const REWARD_API = {
  CLOVER: () => `/${API_SUFFIX}/${MODULE.REWARDS}/clovers`,
  BADGE_LIST: () => `/${API_SUFFIX}/${MODULE.REWARDS}/badges`,
  GACHA: () => `/${API_SUFFIX}/${MODULE.REWARDS}/gotcha`
};
export const RUNNING_API = {
  RUNNING_END: (runningId: string) =>
    `/${API_SUFFIX}/${MODULE.RUNNINGS}/${runningId}/end`,
  RUNNING_START: () => `/${API_SUFFIX}/${MODULE.RUNNINGS}/start`,
  RUNNING_TODAY: () => `/${API_SUFFIX}/${MODULE.RUNNINGS}/today`,
  WEEKLY_RUNNINGS: () =>
    `/${API_SUFFIX}/${MODULE.RUNNINGS}/me/weekly/total-distance`,
  RUNNING_ACTIVE: (runningId: string) =>
    `/${window.location.origin.includes('localhost') ? 'dev/' : ''}${API_SUFFIX}/${window.location.origin.includes('localhost') ? 'running/' : 'runnings'}${runningId}/active`
};
export const GOAL_API = {
  GET_TARGET_DISTANCE: () => `/${API_SUFFIX}/${MODULE.GOALS}/me`,
  CHANGE_TARGET_DISTANCE: () => `/${API_SUFFIX}/${MODULE.GOALS}/me`
};

export const SOCKET_URL = {
  RUNNING_PUBLISH: (runningId: string | number) =>
    `/app/runnings/${runningId}/location`,
  RUNNING_SUBSCRIBE: (runningId: string | number) =>
    `/topic/runnings/${runningId}`
};

export const CREW_API = {
  MEMBER_RUNNING: () => `/${API_SUFFIX}/${MODULE.CREWS}/members/running`
};
