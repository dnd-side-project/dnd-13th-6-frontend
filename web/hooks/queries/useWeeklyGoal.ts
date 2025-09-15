import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getWeeklyGoal } from '@/utils/queries/goal';

export const useWeeklyGoal = () => {
  return useQuery({
    queryKey: queryKeys.running.weeklyStats(),
    queryFn: getWeeklyGoal,
  });
};
