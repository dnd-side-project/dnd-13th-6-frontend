import { useMutation } from '@tanstack/react-query';
import { endRunning } from '@/utils/queries/running';

export const useEndRunning = () => {
  return useMutation({
    mutationFn: endRunning,
    onError: (error) => {
      console.error(error);
    },
  });
};
