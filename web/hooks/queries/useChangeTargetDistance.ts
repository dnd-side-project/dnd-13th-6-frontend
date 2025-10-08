import { useMutation } from '@tanstack/react-query';
import { changeTargetDistance } from '@/utils/apis/goal';

export const useChangeTargetDistance = () => {
  return useMutation({
    mutationFn: changeTargetDistance,
    onError: error => {
      console.error(error);
    }
  });
};
