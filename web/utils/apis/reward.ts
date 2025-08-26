import api from '@/utils/apis/customAxios';
import { REWARD_API } from '@/utils/apis/api';

export const fetchClover = async () => {
  const res = await api.get(`${REWARD_API.CLOVER()}`);
  return res.data.result.count;
};

export const fetchBadgeList = async () => {
  const res = await api.get(`${REWARD_API.BADGE()}`);
  return res.data;
};
