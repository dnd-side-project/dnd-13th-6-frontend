import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getTodayRunning } from '@/utils/apis/running';

export const useTodayRunning = () => {
  return useQuery({
    queryKey: queryKeys.running.today(),
    queryFn: getTodayRunning,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  });
};
