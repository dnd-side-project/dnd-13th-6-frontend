import api from '@/utils/apis/customAxios';
import { MEMBER_API } from '@/utils/apis/api';

//유저 정보
export const getUserInfo = async () => {
  const res = await api.get(`${MEMBER_API.MY_INFO()}`);
  return res.data.result;
};
export const updateNickname = async (nickname: string) => {
  const res = await api.patch(MEMBER_API.CHANGE_NICKNAME(), {
    nickname
  });
  return res.data;
};

//뱃지
export const updateBadge = async (badgeId: number) => {
  const res = await api.patch(MEMBER_API.CHANGE_BADGE(), {
    badgeId
  });
  return res.data;
};

export const getBadge = async (memberId: string) => {
  const res = await api.get(MEMBER_API.MY_BADGE(memberId));
  return res.data;
};