import axios from 'axios';
export default function createAxios() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-USER-ID': '1'
    }
  });

  // instance.interceptors.request.use(config => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance;
}
