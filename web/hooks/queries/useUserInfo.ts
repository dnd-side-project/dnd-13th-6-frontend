import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getUserInfo } from '@/utils/apis/member';
import { UserInfo } from '@/types/userInfo';
import { hasAccessToken } from '@/utils/apis/auth';

export const useUserInfo = () => {
  const hasToken = hasAccessToken();
  return useQuery<UserInfo>({
    queryKey: queryKeys.member.info(),
    queryFn: getUserInfo,
    enabled: hasToken,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  });
};
