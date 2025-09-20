// lib/customAxios.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { redirectToLogin } from '@/utils/authRedirect';
import { tokenRefresh } from '@/utils/apis/auth';

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken') || '';
  }
  return '';
};

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 요청할 때마다 최신 토큰을 가져와서 헤더에 설정
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 응답 인터셉터: 401 발생 시 토큰 재발급 및 재시도
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (!error.response) {
      console.error('Network error', error);
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // HttpOnly refresh token으로 새 액세스 토큰 발급 요청
        await tokenRefresh();

        return api(originalRequest);
      } catch (refreshError) {
        const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=3255efd2af839833b26a422ca203c180&redirect_uri=https://api.runky.store/${isDev ? 'dev/' : '/'}api/auth/login/oauth2/code/kakao&response_type=code`;
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
