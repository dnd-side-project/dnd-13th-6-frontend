import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getGoalDistance } from '@/utils/apis/goal';

export const useGoalDistance = () => {
  return useQuery({
    queryKey: queryKeys.goal.goalDistance(),
    queryFn: getGoalDistance
  });
};
