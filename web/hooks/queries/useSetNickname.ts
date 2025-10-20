import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerWithNickname } from '@/utils/apis/auth';
import { updateNickname } from '@/utils/apis/member';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { queryKeys } from '@/utils/queries/queryKeys';
import { useAtomValue } from 'jotai';
import { signupTokenAtom } from '@/store/auth';

export const useSetNickname = (type: 'onboarding' | 'profile') => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const queryClient = useQueryClient();
  const signupToken = useAtomValue(signupTokenAtom);
  const mutationFn = (nickname: string) => {
    if (type === 'onboarding') {
      return registerWithNickname({ nickname, signupToken });
    }
    return updateNickname(nickname);
  };
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.member.all });
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
