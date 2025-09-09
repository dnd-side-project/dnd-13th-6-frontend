import api from '@/utils/apis/customAxios';
import { GOAL_API } from '@/utils/apis/api';

export const getGoalDistance = async () => {
  const res = await api.get(GOAL_API.GET_TARGET_DISTANCE());
  return res.data.result.goal;
}
