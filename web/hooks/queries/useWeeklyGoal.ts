import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getWeeklyGoal } from '@/utils/apis/goal';

export const useWeeklyGoal = () => {
  return useQuery({
    queryKey: queryKeys.running.weeklyStats(),
    queryFn: getWeeklyGoal,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  });
};
