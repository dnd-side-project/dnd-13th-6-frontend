import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBadges, BadgesResponse } from '@/utils/apis/badge';
import { queryKeys } from '@/utils/queries/queryKeys';
import { useEffect } from 'react';

export const useBadges = () => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.reward.badgeList();

  useEffect(() => {
    const today = new Date();
    const day = today.getDay(); // Sunday = 0, Monday = 1

    if (day === 1) {
      const lastInvalidation = localStorage.getItem('lastBadgeInvalidation');
      const todayStr = today.toISOString().split('T')[0];

      if (lastInvalidation !== todayStr) {
        queryClient.invalidateQueries({ queryKey });
        localStorage.setItem('lastBadgeInvalidation', todayStr);
      }
    }
  }, [queryClient, queryKey]);

  return useQuery<BadgesResponse, Error>({
    queryKey,
    queryFn: getBadges,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
