// lib/customAxios.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { redirectToLogin } from '@/utils/authRedirect';
import { tokenRefresh } from '@/utils/apis/auth';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4YzI5MmRjZi1mMWNmLTQwZWYtYjQ4Ny0yZDgyZWRhMGM2OTEiLCJzdWIiOiIxMCIsImlhdCI6MTc1NzI2MzcxMSwiZXhwIjoxNzU3MzUwMTExLCJyb2xlIjoiVVNFUiJ9.LuRR5c0_SqokZvp6t3TNvgfJ7SMTCHjGP0tkXVw9SZw`
  }
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
        console.error('토큰 재발급 실패', refreshError);
        // window.location.href="https://kauth.kakao.com/oauth/authorize?client_id=3255efd2af839833b26a422ca203c180&redirect_uri=https://api.runky.store/api/auth/login/oauth2/code/kakao&response_type=code"
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    if (status !== 401) {
      console.error('API error', error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
