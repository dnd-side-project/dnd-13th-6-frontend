import { useMutation } from '@tanstack/react-query';
import { startRunning } from '@/utils/queries/running';
import { isAxiosError } from 'axios';
import { RUNNING_API } from '@/utils/apis/api';
import api from '@/utils/apis/customAxios';
export const useStartRunning = () => {
  return useMutation({
    mutationFn: startRunning,
    onSuccess: data => {
      localStorage.setItem('runningId', data.result.runningId);
      localStorage.setItem('runnerId', data.result.runnerId);
    },
    onError: async error => {
      throw error;
    }
  });
};
