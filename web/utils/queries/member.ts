import api from '@/utils/apis/customAxios';
import { MEMBER_API } from '@/utils/apis/api';

export const fetchUserInfo = async () => {
  const res = await api.get(`${MEMBER_API.MY_INFO()}`);
  return res.data.result;
};
export const updateNickname = async (nickname: string) => {
  const res = await api.patch(MEMBER_API.CHANGE_NICKNAME(), {
    nickname
  });
  return res.data;
};
export const updateBadge = async () => {
  const res = await api.patch(MEMBER_API.CHANGE_BADGE());
  return res.data;
};

export const fetchBadge = async (memberId: string) => {
  const res = await api.get(MEMBER_API.MY_BADGE(memberId));
  return res.data;
};