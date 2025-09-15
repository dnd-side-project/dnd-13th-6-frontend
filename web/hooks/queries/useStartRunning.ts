import { useMutation } from '@tanstack/react-query';
import { startRunning } from '@/utils/queries/running';

export const useStartRunning = () => {
  return useMutation({
    mutationFn: startRunning,
    onSuccess: (data) => {
      localStorage.setItem('runningId', data.result.runningId);
      localStorage.setItem('runnerId', data.result.runnerId);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
