import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getCloverCount } from '@/utils/apis/reward';

export const useCloverCount = () => {
  return useQuery({
    queryKey: queryKeys.reward.cloverCount(),
    queryFn: getCloverCount
  });
};
