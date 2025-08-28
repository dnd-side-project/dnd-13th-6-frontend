import { useState, useEffect } from 'react';
import { ENV } from '@/utils/app/consts';
import { APIResponse } from '@/types/genericTypes';

const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>();

  const fetchData = async () => {
    try {
      const res = await fetch(`${ENV.API_BASE_URL}/${url}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        ...options
      });
      const result = (await res.json()) as APIResponse<T>;
      if (res.ok) {
        // console.log(result.result.members);
        setData(result.result);
        setError(null);
      } else {
        throw result;
      }
      return result.result;
    } catch (error: unknown) {
      console.log(error);
      setError(error as Error);
    }
  };

  return { data, error, fetchData };
};

export default useFetch;
