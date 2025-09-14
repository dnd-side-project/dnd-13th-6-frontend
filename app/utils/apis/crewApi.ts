import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_END_POINT } from './api';

const deleteCrewMember = async (crewId: string, memberId: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  return fetch(API_END_POINT.CREWS.DELETE_CREW_MEMBER(crewId, memberId), {
    headers: {
      'Content-Type': 'application/json',
      // Cookie: `accessToken=${token}`,
      Authorization: `Bearer ${token}`
    }
  });
};

export const CrewApi = {
  deleteCrewMember
};
