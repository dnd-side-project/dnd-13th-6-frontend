import { useQuery } from '@tanstack/react-query';
import { Crew } from '@/types/crew';
import { CrewApi } from '@/utils/apis/crewApi';

export const useCrews = () => {
  return useQuery<Crew[], Error>({
    queryKey: ['crews'],
    queryFn: CrewApi.getCrewList
  });
};
