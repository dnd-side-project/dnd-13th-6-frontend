import api from '@/utils/apis/customAxios';
import { REWARD_API } from '@/utils/apis/api';

export interface Badge {
  badge: string;
  badgeId: string;
}

export interface BadgesResponse {
  badges: Badge[];
}

export const getBadges = async (): Promise<BadgesResponse> => {
  const response = await api.get(REWARD_API.BADGE_LIST());
  return response.data.result;
};
