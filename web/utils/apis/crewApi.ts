import { API_END_POINT } from './api';
import createAxios from './createAxios';

export const CrewApi = {
  getCrewList: async () => {
    const response = await createAxios().get(
      API_END_POINT.CREWS.GET_CREW_LIST()
    );
    return response.data;
  },
  createCrew: async (name: string) => {
    const response = await createAxios().post(
      API_END_POINT.CREWS.CREATE_CREW(),
      {
        name
      }
    );
    return response.data;
  }
};
