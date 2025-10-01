import { useMutation } from '@tanstack/react-query';
import { updateBadge } from '@/utils/queries/member';
import { useRouter } from 'next/navigation';

export const useOnboardingUpdateBadge = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: updateBadge,
    onSuccess: () => {
      router.push('/onboarding/setup-target');
    }
  });
};
