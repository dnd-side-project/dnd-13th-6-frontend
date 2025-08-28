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
};

// ✅ 모듈별 API 타입 정의
interface APIDefinitions {
  CREWS: {
    GET_CREW_LIST: () => string;
    CREATE_CREW: () => string;
    JOIN_CREW: () => string;
    GET_CREW_DETAIL: (crewId: string) => string;
    GET_CREW_MEMBERS: (crewId: string) => string;
    DELETE_CREW_MEMBER: (crewId: string, memberId: string) => string;
    UPDATE_CREW_NOTICE: (crewId: string) => string;
    EXIT_CREW: (crewId: number) => string;
    DELETE_CREW: (crewId: number) => string;
  };
  AUTH: {};
}

// ✅ API_END_POINT 타입 = MODULE의 key 중에서 정의된 API만 포함
export const API_END_POINT: { [K in keyof APIDefinitions]: APIDefinitions[K] } =
  {
    CREWS: {
      GET_CREW_LIST: () => `${API_SUFFIX}/${MODULE.CREWS}`,
      CREATE_CREW: () => `${API_SUFFIX}/${MODULE.CREWS}`,
      JOIN_CREW: () => `${API_SUFFIX}/${MODULE.CREWS}/join`,
      GET_CREW_DETAIL: (crewId: string) =>
        `${API_SUFFIX}/${MODULE.CREWS}/${crewId}`,
      GET_CREW_MEMBERS: (crewId: string) =>
        `${API_SUFFIX}/${MODULE.CREWS}/${crewId}/members`,
      DELETE_CREW_MEMBER: (crewId: string, memberId: string) =>
        `${API_SUFFIX}/${MODULE.CREWS}/${crewId}/members/${memberId}`,
      UPDATE_CREW_NOTICE: (crewId: string) =>
        `${API_SUFFIX}/${MODULE.CREWS}/${crewId}/notice`,
      EXIT_CREW: (crewId: number) =>
        `${API_SUFFIX}/${MODULE.CREWS}/${crewId}/members/me`,
      DELETE_CREW: (crewId: number) => `${API_SUFFIX}/${MODULE.CREWS}/${crewId}`
    },
    AUTH: {}
  };
