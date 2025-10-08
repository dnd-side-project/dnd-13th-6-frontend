import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getWeeklyGoal } from '@/utils/apis/goal';

export const useWeeklyGoal = () => {
  return useQuery({
    queryKey: queryKeys.running.weeklyStats(),
    queryFn: getWeeklyGoal
  });
};
