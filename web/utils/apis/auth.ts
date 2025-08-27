import api from '@/utils/apis/customAxios';
import { AUTH_API } from '@/utils/apis/api';
import axios from 'axios';

export const registerWithNickname = async (nickname: string) => {
  const res = await api.post(AUTH_API.SIGN_UP(), {
    nickname
  });
  return res.data.result;
};
export const tokenRefresh = async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}${AUTH_API.REFRESH_TOKEN()}`,
    {},
    { withCredentials: true } // 브라우저가 자동으로 refresh token 쿠키를 포함하여 전송
  );
};
