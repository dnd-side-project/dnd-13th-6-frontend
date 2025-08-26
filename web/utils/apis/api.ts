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
