import api from '@/utils/apis/customAxios';
import { RUNNING_API } from '@/utils/apis/api';

export const runningStart = async () => {
  const res = await api.post(RUNNING_API.RUNNING_START());
  return res.data;
};
export const runningEnd = async (runningId: string) => {
  const res = await api.post(RUNNING_API.RUNNING_END(runningId));
  return res.data;
};
