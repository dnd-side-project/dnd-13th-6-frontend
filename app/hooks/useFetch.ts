import { useState, useEffect } from 'react';
import { ENV } from '@/utils/app/consts';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>();

  const fetchData = async () => {
    try {
      console.log(`${ENV.API_BASE_URL}${url}`);
      const res = await fetch(`${ENV.API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-USER-ID': '1'
        }
      });
      const result = await res.json();
      if (res.ok) {
        setData(result);
        setError(null);
      } else {
        throw result;
      }
    } catch (error: unknown) {
      console.log(error);
      setError(error as Error);
    }
  };

  return { data, error, fetchData };
};

export default useFetch;
