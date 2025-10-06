
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/apis/customAxios';
import { REWARD_API } from '@/utils/apis/api';

interface Badge {
  badge: string;
  badgeId: string;
}

interface BadgesResponse {
  badges: Badge[];
}

const fetchBadges = async (): Promise<BadgesResponse> => {
  const response = await api.get(REWARD_API.BADGE_LIST());
  return response.data.result;
};

export const useBadges = () => {
  return useQuery<BadgesResponse, Error>({
    queryKey: ['badges'],
    queryFn: fetchBadges,
  });
};
