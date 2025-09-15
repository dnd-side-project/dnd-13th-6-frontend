import api from '@/utils/apis/customAxios';
import { CREW_API, RUNNING_API } from '@/utils/apis/api';

export const startRunning = async () => {
  const res = await api.post(RUNNING_API.RUNNING_START());
  return res.data;
};

export const endRunning = async ({ runningId, postData }: { runningId: string; postData: any }) => {
  const res = await api.post(RUNNING_API.RUNNING_END(runningId), postData);
  return res.data;
};

export const getWeeklyRunDistance = async () => {
  const res = await api.get(RUNNING_API.WEEKLY_RUNNINGS());
  return res.data.result.totalDistanceKm;
};

export const getTodayRunning = async () => {
  const res = await api.get(RUNNING_API.RUNNING_TODAY());
  return res.data.result;
};

export const getRunningUsers = async () => {
  const res = await api.get(CREW_API.MEMBER_RUNNING());
  return res.data.result.runningMembers;
};
