import api from '@/utils/apis/customAxios';
import { GOAL_API, RUNNING_API } from '@/utils/apis/api';

export const getGoalDistance = async () => {
  const res = await api.get(GOAL_API.GET_TARGET_DISTANCE());
  return res.data.result.goal;
}

export const getWeeklyGoal = async () => {
    const [goalRes, weeklyRunRes] = await Promise.all([
        api.get(GOAL_API.GET_TARGET_DISTANCE()),
        api.get(RUNNING_API.WEEKLY_RUNNINGS()),
      ]);
      localStorage.setItem('weeklyGoalDistance', goalRes.data.result.goal);
      return {
        goalDistance: goalRes.data.result.goal,
        weeklyRunDistance: weeklyRunRes.data.result.totalDistanceKm,
      };
}