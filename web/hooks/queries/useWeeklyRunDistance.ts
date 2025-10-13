import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getWeeklyRunDistance } from '@/utils/apis/running';

export const useWeeklyRunDistance = () => {
  return useQuery({
    queryKey: queryKeys.running.weeklyStats(),
    queryFn: getWeeklyRunDistance,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  });
};
