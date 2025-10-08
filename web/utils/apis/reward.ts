import api from '@/utils/apis/customAxios';
import { REWARD_API } from '@/utils/apis/api';

export const gacha = async () => {
  const res = await api.patch(REWARD_API.GACHA());
  return res.data;
};

export const getCloverCount = async () => {
  const res = await api.get(REWARD_API.CLOVER());
  return res.data.result.count;
};
