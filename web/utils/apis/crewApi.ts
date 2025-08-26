import { API_END_POINT } from './api';
import createAxios from './createAxios';

export const CrewApi = {
  getCrewList: async () => {
    const response = await createAxios().get(
      API_END_POINT.CREWS.GET_CREW_LIST()
    );
    return response.data;
  }
};
