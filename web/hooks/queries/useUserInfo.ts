import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getUserInfo } from '@/utils/queries/member';
import { UserInfo } from '@/types/userInfo';


export const useUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: queryKeys.member.info(),
    queryFn: getUserInfo,
  });
};
