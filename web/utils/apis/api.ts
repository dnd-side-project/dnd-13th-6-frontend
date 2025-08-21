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
  CALENDAR: 'calendar',

};

/** Module + API Version Prefix + Contorller + End-Point */
export const API_END_POINT = {
  /** 크루  */
  CREATE_CREW:() => {},
  JOIN_CREW: () => {},
  GET_CREW_LIST: () => {},
  GET_CREW_DETAIL: (crewId: number) =>  {},
  PATCH_CREW_NAME: () => {},
  PATCH_CREW_NOTIFICATION: () => {},
  DELETE_CREW: () => {},
  EXIT_CREW: () => {},
  DELEGATE_CEW_LEADER: () => {},
  DEPORT_CREW_MEMBER: () => {},
  GET_CREW_MEMBER_LIST: (crewId: number) => {},
};
