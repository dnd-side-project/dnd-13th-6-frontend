import api from '@/utils/apis/customAxios';
import { AUTH_API, MEMBER_API } from '@/utils/apis/api';
import axios from 'axios';

export const registerWithNickname = async (nickname: string) => {
  const res = await api.post(AUTH_API.SIGN_UP(), { nickname });

  return res.data.result;
};

export const tokenRefresh = async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${AUTH_API.REFRESH_TOKEN()}`,
    {},
    { withCredentials: true } // 브라우저가 자동으로 refresh token 쿠키를 포함하여 전송
  );
};

export const logout = async () => {
  if (isDev) {
    await api.post(
      `${AUTH_API.LOG_OUT()}`,
      {},
      {
        headers: {
          'X-Refresh-Token': localStorage.getItem('refreshToken') || ''
        }
      }
    );
  } else {
    await api.post(AUTH_API.LOG_OUT());
  }
};
export const withdraw = async () => {
  await api.delete(MEMBER_API.WITHDRAW());
};
