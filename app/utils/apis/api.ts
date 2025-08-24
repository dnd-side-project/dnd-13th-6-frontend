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
    GET_CREW_LIST: () => `/${API_SUFFIX}/${MODULE.CREWS}`,
    CREATE_CREW: () => `/${API_SUFFIX}/${MODULE.CREWS}`,
    JOIN_CREW: () => `/${API_SUFFIX}/${MODULE.CREWS}/join`,
    GET_CREW_DETAIL: (crewId: number) =>
      `/${API_SUFFIX}/${MODULE.CREWS}/${crewId}`
  }
};
