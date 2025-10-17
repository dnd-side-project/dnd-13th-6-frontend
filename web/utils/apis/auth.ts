import api from '@/utils/apis/customAxios';
import { AUTH_API, MEMBER_API } from '@/utils/apis/api';
import axios from 'axios';

export async function exchangeToken(code: string) {
  const response = await api.post('/api/auth/token/exchange', {
    authCode: code
  });
  const accessToken = response.headers.authorization;
  const refreshToken = response.headers['x-refresh-token'];

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken.replace('Bearer ', ''));
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
}

export const registerWithNickname = async ({
  nickname,
  signupToken
}: {
  nickname: string;
  signupToken: string | null;
}) => {
  const res = await api.post(
    AUTH_API.SIGN_UP(),
    { nickname },
    {
      params: {
        signupToken
      }
    }
  );
  if (res.data.result.authCode) {
    try {
      await exchangeToken(res.data.result.authCode);
    } catch (error) {
      console.error(error);
    }
  }
};

export const tokenRefresh = async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${AUTH_API.REFRESH_TOKEN()}`,
    {},
    { withCredentials: true } // 브라우저가 자동으로 refresh token 쿠키를 포함하여 전송
  );
};

export const logout = async () => {
  await api.post(
    `${AUTH_API.LOG_OUT()}`,
    {},
    {
      headers: {
        'X-Refresh-Token': localStorage.getItem('refreshToken') || ''
      }
    }
  );
};
export const withdraw = async () => {
  await api.delete(MEMBER_API.WITHDRAW());
};

export const hasAccessToken = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return !!localStorage.getItem('accessToken');
};
