import { useQuery } from '@tanstack/react-query';
import { getBadges, BadgesResponse } from '@/utils/apis/badge';
import { queryKeys } from '@/utils/queries/queryKeys';

export const useBadges = () => {
  return useQuery<BadgesResponse, Error>({
    queryKey: queryKeys.reward.badgeList(),
    queryFn: getBadges,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  });
};
