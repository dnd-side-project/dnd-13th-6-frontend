'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { MODULE } from '@/utils/apis/api';
import { exchangeToken } from '@/utils/apis/auth';

async function handleAuthCodeExchange(router: ReturnType<typeof useRouter>) {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const token = localStorage.getItem('accessToken');
  if (code && !token) {
    try {
      await exchangeToken(code);
    } catch (error) {
      console.error(error);
    } finally {
      router.replace(window.location.pathname);
    }
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

    //앱에서 토큰을 받은 후 URL 정리 (쿼리 파라미터 및 해시 제거)
    router.replace(window.location.pathname);

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
}

export const useAuthToken = () => {
  const router = useRouter();
  useEffect(() => {
    handleAuthCodeExchange(router);
  }, [router]);
};
