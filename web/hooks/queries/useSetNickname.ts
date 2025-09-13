import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { registerWithNickname } from '@/utils/apis/auth';
import { updateNickname } from '@/utils/queries/member';
import { useRouter } from 'next/navigation';

export const useSetNickname = (type: 'onboarding' | 'profile') => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationFn =
    type === 'onboarding' ? registerWithNickname : updateNickname;

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.member.info() });
      const destination =
        type === 'onboarding' ? '/onboarding/select-character' : '/main';
      router.push(destination);
    },
  });
};
