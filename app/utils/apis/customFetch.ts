export interface IFetchError extends Error {
  code: string;
  message: string;
  status: string;
}

export const customFetch = async (url: string, options: RequestInit): Promise<Response> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const refreshToken = localStorage.getItem('accessToken');
  //TODO: 토큰 쿠키로 변경
  const defaultHeaders: HeadersInit = {};

  const mergedHeaders = {
    ...defaultHeaders,
    ...options.headers,
  };

  const handleTokenRefresh = async () => {
    // try {
    //   localStorage.removeItem('accessToken');
    //   localStorage.removeItem('user');
    //   const response = await fetch(`${baseUrl}/auth-api/api/v1/token/refresh`, {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: defaultHeaders,
    //   });
    //   if (!response.ok) throw new Error('토큰 갱신 실패');
    //   const jwtToken = response.headers.get('Authorization') as string;
    //   localStorage.setItem('accessToken', jwtToken.split('Bearer ')[1]);
    //   return response;
    // } catch (error) {
    //   throw error;
    // }
  };

  if (refreshToken) {
    defaultHeaders.Authorization = refreshToken;
  }
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      credentials: 'include',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });
    // 401 또는 403 에러 발생 시 토큰 재발급 시도
    if (response.status === 401) {
      await handleTokenRefresh();

      // 토큰 재발급 후 원래 요청 재시도
      const retryResponse = await fetch(`${baseUrl}${url}`, {
        ...options,
        credentials: 'include',
        headers: mergedHeaders,
      });

      return retryResponse;
    } else if (response.status !== 200) {
      throw await response.json();
    }

    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('HTTP error')) {
      throw error;
    }
    throw error;
  }
};
