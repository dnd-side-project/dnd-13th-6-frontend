import { useMutation } from '@tanstack/react-query';
import { runningEnd } from '@/utils/apis/running';

export const useEndRunning = () => {
  return useMutation({
    mutationFn: runningEnd,
    onError: error => {
      console.error(error);
    }
  });
};
