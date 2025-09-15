import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getWeeklyRunDistance } from '@/utils/queries/running';

export const useWeeklyRunDistance = () => {
  return useQuery({
    queryKey: queryKeys.running.weeklyStats(),
    queryFn: getWeeklyRunDistance,
  });
};
