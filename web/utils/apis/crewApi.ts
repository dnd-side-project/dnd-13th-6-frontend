import { API_END_POINT } from './api';
import api from './customAxios';

export const CrewApi = {
  getCrewList: async () => {
    const response = await api.get(API_END_POINT.CREWS.GET_CREW_LIST());
    return response.data;
  },
  createCrew: async (name: string) => {
    const response = await api.post(API_END_POINT.CREWS.CREATE_CREW(), {
      name
    });
    return response.data;
  }
};
