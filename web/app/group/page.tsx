'use client';
import { useRouter } from 'next/navigation';
import CrewChallengeCard from '@/components/main/CrewChallengeCard';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { MODULE } from '@/utils/apis/api';
import { Crew } from '@/types/crew';
import { useCrews } from '@/hooks/queries/useCrews';

export default function Page() {
  const router = useRouter();
  const { data: crewList = [], isLoading, isError } = useCrews();

  const onMove = (url: string) => {
    const data = {
      type: MODULE.PUSH,
      url: url
    };
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  };

  const moveResultPage = (
    e: React.MouseEvent<HTMLButtonElement>,
    crew: Crew
  ) => {
    e.stopPropagation();
    const type = 'crew';
    const isSuccess =
      crew.goal > 0 &&
      Math.round((crew.runningDistance / crew.goal) * 100) >= 100;
    router.push(`/crew-reward?type=${type}&isSuccess=${isSuccess}`);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner component
  }

  if (isError) {
    return <div>Error loading crews.</div>; // Or an error component
  }

  return (
    <div className="border-main flex h-screen w-full flex-col">
      <div className="flex flex-grow flex-col gap-5 p-4">
        {crewList.map(crew => (
          <CrewChallengeCard
            key={crew.crewId}
            id={crew.crewId}
            title={crew.name}
            progress={
              isNaN(crew.runningDistance / crew.goal)
                ? 0
                : Math.round((crew.runningDistance / crew.goal) * 100)
            }
            goal={crew.goal}
            runningDistance={crew.runningDistance}
            isRunning={crew.isRunning}
            members={crew.badgeImageUrls}
            className={`border ${
              crew.goal > 0 &&
              Math.round((crew.runningDistance / crew.goal) * 100) >= 100
                ? 'border-[#00FF63]'
                : 'border-none'
            } `}
            onClick={() => onMove(`/(tabs)/(group)/running/${crew.crewId}`)}
          >
            <button
              className="mt-4 w-full rounded-2xl bg-[#48484A]"
              onClick={e => moveResultPage(e, crew)}
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
