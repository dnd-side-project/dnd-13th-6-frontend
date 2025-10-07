import { useQuery } from '@tanstack/react-query';
import { getBadges } from '@/utils/apis/badge';
import { BadgesResponse } from '@/utils/apis/badge';
export const useBadges = () => {
  return useQuery<BadgesResponse, Error>({
    queryKey: ['badges'],
    queryFn: getBadges
  });
};
