import { useMutation } from '@tanstack/react-query';
import { registerWithNickname } from '@/utils/apis/auth';
import { updateNickname } from '@/utils/queries/member';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AxiosError } from 'axios';

export const useSetNickname = (type: 'onboarding' | 'profile') => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const mutationFn =
    type === 'onboarding' ? registerWithNickname : updateNickname;

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      if (type === 'profile') return;
      const destination =
        type === 'onboarding' ? '/onboarding/select-character' : '/main';
      router.push(destination);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError && error.response) {
        const apiError = error.response.data as { message: string };
        setErrorMessage(apiError.message || '오류가 발생했습니다.');
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  });

  return { ...mutation, errorMessage, setErrorMessage };
};
