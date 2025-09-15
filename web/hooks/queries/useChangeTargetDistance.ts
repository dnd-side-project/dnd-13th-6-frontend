import { useMutation } from '@tanstack/react-query';
import { changeTargetDistance } from '@/utils/queries/goal';

export const useChangeTargetDistance = () => {
  return useMutation({
    mutationFn: changeTargetDistance,
    onError: (error) => {
      console.error(error);
    },
  });
};
