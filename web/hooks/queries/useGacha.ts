import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gacha } from '@/utils/apis/reward';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/utils/queries/queryKeys';

export const useGacha = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gacha,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reward.all });
      router.push(
        `/badge-collection/gacha/result?id=${data.result?.id}&url=${data.result?.imageUrl}`
      );
    },
    onError: error => {
      console.error(error);
    }
  });
};
