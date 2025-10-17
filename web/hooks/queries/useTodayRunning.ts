import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getTodayRunning } from '@/utils/apis/running';
import { hasAccessToken } from '@/utils/apis/auth';

export const useTodayRunning = () => {
  const hasToken = hasAccessToken();

  return useQuery({
    queryKey: queryKeys.running.today(),
    queryFn: getTodayRunning,
    enabled: hasToken,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  });
};
