import api from '@/utils/apis/customAxios';
import { REWARD_API } from '@/utils/apis/api';

export const getCloverCount = async () => {
  const res = await api.get(`${REWARD_API.CLOVER()}`);
  return res.data.result.count;
};

export const patchGacha = async ()=>{
const res = await api.patch(`${REWARD_API.GACHA()}`);
  return res.data.result.count;
}
export const getBadgeList = async () => {
  const res = await api.get(`${REWARD_API.BADGE_LIST()}`);
  return res.data.result;
}