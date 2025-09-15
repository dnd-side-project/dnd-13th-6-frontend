import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getTodayRunning } from '@/utils/queries/running';

export const useTodayRunning = () => {
  return useQuery({
    queryKey: queryKeys.running.today(),
    queryFn: getTodayRunning,
  });
};
