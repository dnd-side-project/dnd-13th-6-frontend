// lib/customAxios.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AUTH_API } from '@/utils/apis/api';
import { redirectToLogin } from '@/utils/authRedirect';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000
});

// 요청 인터셉터:
// withCredentials: true 옵션으로 HttpOnly 쿠키가 자동으로 전송되므로,
// 헤더에 수동으로 토큰을 추가하는 로직은 제거합니다.
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
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${AUTH_API.REFRESH_TOKEN()}`,
          {},
          { withCredentials: true } // 브라우저가 자동으로 refresh token 쿠키를 포함하여 전송
        );

        return api(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 실패', refreshError);
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
