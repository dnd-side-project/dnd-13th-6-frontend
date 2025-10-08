import { useMutation } from '@tanstack/react-query';
import { runningStart } from '@/utils/apis/running';

export const useStartRunning = () => {
  return useMutation({
    mutationFn: runningStart,
    onSuccess: data => {
      localStorage.setItem('runningId', data.result.runningId);
      localStorage.setItem('runnerId', data.result.runnerId);
    },
    onError: async error => {
      throw error;
    }
  });
};
