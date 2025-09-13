import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { updateBadge } from '@/utils/queries/member';
import { useRouter } from 'next/navigation';

export const useOnboardingUpdateBadge = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.member.info() });
      router.push('/onboarding/setup-target');
    },
  });
};
