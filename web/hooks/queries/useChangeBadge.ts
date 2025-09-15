import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import api from '@/utils/apis/customAxios';
import { MEMBER_API } from '@/utils/apis/api';

export const useChangeBadge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newBadgeId: number) =>
      api.patch(MEMBER_API.CHANGE_BADGE(), { badgeId: newBadgeId }),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.member.info(),
      });
    },
  });
};
