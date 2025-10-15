import { useMutation, useQueryClient } from '@tanstack/react-query';
import { runningEnd } from '@/utils/apis/running';
import { queryKeys } from '@/utils/queries/queryKeys';

export const useEndRunning = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: runningEnd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.running.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.goal.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.reward.all });
    },
    onError: error => {
      console.error(error);
    }
  });
};
