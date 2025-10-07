import { useQuery } from '@tanstack/react-query';
import { CrewApi } from '@/utils/apis/crewApi';
import { APIResponse } from '@/types/genericTypes';
import { Crew } from '@/types/crew';

const fetchCrews = async () => {
  const response = (await CrewApi.getCrewList()) as APIResponse<{
    crews: Crew[];
  }>;
  return response.result.crews;
};

export const useCrews = () => {
  return useQuery<Crew[], Error>({
    queryKey: ['crews'],
    queryFn: fetchCrews
  });
};
