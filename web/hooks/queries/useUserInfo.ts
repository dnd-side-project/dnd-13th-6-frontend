import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getUserInfo } from '@/utils/apis/member';
import { UserInfo } from '@/types/userInfo';

export const useUserInfo = () => {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');

  return useQuery<UserInfo>({
    queryKey: queryKeys.member.info(),
    queryFn: getUserInfo,
    enabled: hasToken,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  });
};
