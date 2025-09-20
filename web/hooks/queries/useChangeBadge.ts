import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { updateBadge } from '@/utils/queries/member';

export const useChangeBadge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newBadgeId: number) =>
      updateBadge(newBadgeId),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.member.info(),
      });
    },
  });
};
