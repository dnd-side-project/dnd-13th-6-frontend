import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getGoalDistance } from '@/utils/apis/goal';

// 일주일간 고정됨
export const useGoalDistance = () => {
  return useQuery({
    queryKey: queryKeys.goal.goalDistance(),
    queryFn: getGoalDistance,
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 65, // 1시간 5분
  });
};
