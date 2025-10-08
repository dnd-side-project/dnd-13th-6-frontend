import api from '@/utils/apis/customAxios';
import { AUTH_API, MEMBER_API } from '@/utils/apis/api';
import axios from 'axios';
const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';

export const registerWithNickname = async (nickname: string) => {
  let res;
  if (isDev) {
    res = await api.post(
      `/dev${AUTH_API.SIGN_UP()}`,
      { nickname },
      {
        headers: {
          'X-Signup-Token': sessionStorage.getItem('signupToken') || ''
        }
      }
    );
  } else {
    res = await api.post(AUTH_API.SIGN_UP(), { nickname });
  }

  return res.data.result;
};

export const tokenRefresh = async () => {
  if (isDev) {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/dev${AUTH_API.REFRESH_TOKEN()}`,
      {},
      {
        headers: {
          'X-Refresh-Token': localStorage.getItem('refreshToken') || ''
        }
      }
    );
  } else {
    //api 인스턴스를 사용하지 않는 이유: 인터셉터가 설정되어 있어 무한 루프에 빠질 수 있음
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${AUTH_API.REFRESH_TOKEN()}`,
      {},
      { withCredentials: true } // 브라우저가 자동으로 refresh token 쿠키를 포함하여 전송
    );
  }
};

export const logout = async () => {
  if (isDev) {
    await api.post(
      `/dev${AUTH_API.LOG_OUT()}`,
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
