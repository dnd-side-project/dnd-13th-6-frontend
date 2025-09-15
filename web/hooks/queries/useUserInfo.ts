import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getUserInfo } from '@/utils/queries/member';

interface UserInfo {
  nickname: string;
  badgeUrl: string;
  userId: string;
  badgeId: number;
}

export const useUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: queryKeys.member.info(),
    queryFn: getUserInfo,
  });
};
