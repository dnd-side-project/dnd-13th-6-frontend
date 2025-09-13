import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getRunningUsers } from '@/utils/queries/running';
import { RunningUser } from '@/types/runningUser';

export const useRunningUsers = () => {
  return useQuery<RunningUser[]>({
    queryKey: queryKeys.crew.running(),
    queryFn: getRunningUsers,
  });
};
