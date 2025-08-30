'use client';
import { useRouter } from 'next/navigation';
import CrewChallengeCard from '@/components/main/CrewChallengeCard';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { MODULE } from '@/utils/apis/api';
import { Crew } from '@/types/crew';
import { useLayoutEffect, useState } from 'react';
import { CrewApi } from '@/utils/apis/crewApi';
import { APIResponse } from '@/types/genericTypes';
export default function Page() {
  const router = useRouter();
  const [crewList, setCrewList] = useState<Crew[]>([]);
  const onMove = (url: string) => {
    const data = {
      type: MODULE.PUSH,
      url: url
    };
    console.log('url', url);
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  };
  useLayoutEffect(() => {
    const init = async () => {
      const response = (await CrewApi.getCrewList()) as APIResponse<{
        crews: Crew[];
      }>;
      setCrewList(response.result.crews);
    };
    init();
  }, []);
  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col">
      <div className="flex flex-grow flex-col gap-5 overflow-y-scroll p-4">
        {crewList.map(crew => (
          <CrewChallengeCard
            key={crew.crewId}
            id={crew.crewId}
            title={crew.name}
            distance={42}
            progress={
              isNaN(crew.runningDistance / crew.goal)
                ? 0
                : Math.round((crew.runningDistance / crew.goal) * 100)
            }
            goal={crew.goal}
            runningDistance={crew.runningDistance}
            isRunning={crew.isRunning}
            members={crew.badgeImageUrls}
            className="border !border-[#00FF63]"
            onClick={() => onMove(`/(tabs)/(group)/running/${crew.crewId}`)}
          >
            <button
              className="mt-4 w-full rounded-2xl bg-[#48484A]"
              onClick={() =>
                router.push('/crew-reward?type=crew&isSuccess=true')
              }
            >
              <div className="py-3 text-[18px] font-bold text-[#E5E5EA]">
                저번 주 결과 보기
              </div>
            </button>
          </CrewChallengeCard>
        ))}
        <div className="flex gap-3 bg-none">
          <button
            className="flex-1 rounded-2xl bg-[#48484A]"
            onClick={() => onMove('/(tabs)/(group)/create')}
          >
            <div className="py-3 text-[17px] font-bold">크루 만들기</div>
          </button>
          <button
            className="flex-1 rounded-2xl bg-[#32FF76]"
            onClick={() => onMove('/(tabs)/(group)/code')}
          >
            <div className="py-3 text-[18px] font-bold text-black">
              초대 코드 입력
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
