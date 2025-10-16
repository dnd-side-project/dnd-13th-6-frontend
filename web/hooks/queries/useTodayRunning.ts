import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getTodayRunning } from '@/utils/apis/running';

export const useTodayRunning = () => {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');

  return useQuery({
    queryKey: queryKeys.running.today(),
    queryFn: getTodayRunning,
    enabled: hasToken,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  });
};
