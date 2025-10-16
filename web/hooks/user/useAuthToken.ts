'use client';
import { useEffect } from 'react';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { MODULE } from '@/utils/apis/api';
import api from '@/utils/apis/customAxios';


async function exchangeToken(code: string) {
  const response = await api.post('/api/auth/token/exchange', {authCode: code})
  const accessToken = response.headers.authorization;
  const refreshToken = response.headers['x-refresh-token'];

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken.replace('Bearer ', ''));
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
}

export const useAuthToken = () => {
  useEffect(() => {

    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const token = localStorage.getItem('accessToken');
    if(code && !token) {
       exchangeToken(code);
       return;
    }
    if (!hash) {
      postMessageToApp(MODULE.AUTH);
      return;
    }

    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');




    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // URL에서 해시 제거
      window.history.replaceState(null, '', window.location.pathname);

      // 앱으로 인증 정보 전송
      postMessageToApp(
        MODULE.AUTH,
        JSON.stringify({ accessToken, refreshToken })
      );

      // 앱의 홈 화면으로 리디렉션 요청
      const data = {
        type: MODULE.PUSH,
        url: '/(tabs)/(home)'
      };
      postMessageToApp(MODULE.PUSH, JSON.stringify(data));
    } else {
      // 해시는 있지만 토큰이 없는 경우
      postMessageToApp(MODULE.AUTH);
    }
  }, []);
};
