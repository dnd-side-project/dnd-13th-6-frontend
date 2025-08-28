const API_SUFFIX = 'api';
export const API_VERSION_PREFIX = 'api/v1';

export const MODULE = {
  AUTH: `auth`,
  USERS: 'users',
  CREWS: `${API_SUFFIX}/crews`,
  GOALS: 'goals',
  REWARDS: 'rewards',
  PUSH: 'push',
  RUNS: 'runs',
  RUNNER: 'runner',
  RUNNINGS: 'runnings',
  CALENDAR: 'calendar'
};

interface CrewAPI {
  GET_CREW_LIST: () => string;
  CREATE_CREW: () => string;
  JOIN_CREW: () => string;
  GET_CREW_DETAIL: (crewId: number) => string;
}

const enum Controller {
  CREWS = 'crews'
}

export const API_END_POINT: Record<Controller, CrewAPI> = {
  [Controller.CREWS]: {
    GET_CREW_LIST: () => `${API_VERSION_PREFIX}/${MODULE.CREWS}`,
    CREATE_CREW: () => `${API_VERSION_PREFIX}/${MODULE.CREWS}`,
    JOIN_CREW: () => `${API_VERSION_PREFIX}/${MODULE.CREWS}/join`,
    GET_CREW_DETAIL: (crewId: number) =>
      `${API_VERSION_PREFIX}/${MODULE.CREWS}/${crewId}`
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
  BADGE_LIST: () => `/api/rewards/badges`,
  GACHA: () => `/api/rewards/gotcha`
};
export const RUNNING_API = {
  RUNNING_END: (runningId: string) => `/api/runnings/${runningId}/end`,
  RUNNING_START: () => `/api/runnings/start`,
  RUNNING_TODAY: () => `/api/runnings/today`,
  WEEKLY_RUNNINGS: () => `/api/runnings/me/weekly/total-distance`
};
export const GOAL_API = {
  GET_TARGET_DISTANCE: () => '/api/goals/me',
  CHANGE_TARGET_DISTANCE: () => '/api/goals/me'
};
