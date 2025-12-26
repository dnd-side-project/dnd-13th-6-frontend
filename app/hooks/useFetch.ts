import { useState } from 'react';
import { ENV } from '@/utils/app/consts';
import { APIResponse } from '@/types/genericTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>();

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await fetch(`${ENV.API_BASE_URL}/${url}`, {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `accessToken=${token}`,
          Authorization: `Bearer ${token}`
        },
        ...options
      });
      const result = (await res.json()) as APIResponse<T>;
      if (res.ok) {
        setData(result.result);
        setError(null);
      } else {
        throw result;
      }
      return result.result;
    } catch (error: unknown) {
      if(error.code === 401 || error.code === 403) {
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('refreshToken');
        useRouter().push('/(tabs)/(onboarding)');
      }
      setError(error as Error);
    }
  };

  return { data, error, fetchData };
};

export default useFetch;
