import { useMutation } from '@tanstack/react-query';
import { gacha } from '@/utils/queries/reward';
import { useRouter } from 'next/navigation';

export const useGacha = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: gacha,
    onSuccess: (data) => {
      router.push(
        `/badge-collection/gacha/result?id=${data.result?.id}&url=${data.result?.imageUrl}`
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
