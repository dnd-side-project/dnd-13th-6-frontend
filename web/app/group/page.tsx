'use client';

import CrewChallengeCard from '@/components/main/CrewChallengeCard';
import { useCrews } from '@/hooks/queries/useCrews';
import { Crew } from '@/types/crew';

const Page = () => {
  const { data: crewList, isLoading } = useCrews();

  if (isLoading) {
    return <div>...loading</div>;
  }

  return (
    <div className="border-main flex h-screen w-full flex-col">
      <div className="flex flex-grow flex-col gap-5 p-4">
        {(crewList || []).map((crew: Crew) => {
          const progress =
            crew.goal > 0 ? (crew.runningDistance / crew.goal) * 100 : 0;
          return (
            <CrewChallengeCard
              key={crew.crewId}
              id={crew.crewId}
              title={crew.name}
              members={crew.badgeImageUrls}
              progress={progress}
              goal={crew.goal}
              runningDistance={crew.runningDistance}
              isRunning={crew.isRunning}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
