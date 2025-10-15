import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getGoalDistance } from '@/utils/apis/goal';
import { useEffect, useMemo } from 'react';

// 일주일간 고정됨
export const useGoalDistance = () => {
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => queryKeys.goal.goalDistance(), []);

  useEffect(() => {
    const today = new Date();
    const day = today.getDay(); // Sunday = 0, Monday = 1

    if (day === 1) {
      const lastInvalidation = localStorage.getItem(
        'lastGoalDistanceInvalidation'
      );
      const todayStr = today.toISOString().split('T')[0];

      if (lastInvalidation !== todayStr) {
        queryClient.invalidateQueries({ queryKey });
        localStorage.setItem('lastGoalDistanceInvalidation', todayStr);
      }
    }
  }, [queryClient, queryKey]);

  return useQuery({
    queryKey, 
    queryFn: getGoalDistance,
    staleTime: Infinity,                                                                                                                                                                                                                           │
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days        
  });
};