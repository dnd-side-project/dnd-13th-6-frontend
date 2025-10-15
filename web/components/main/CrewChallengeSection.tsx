import React from 'react';
import CrewChallengeCard, { CrewChallengeCardProps } from './CrewChallengeCard';
import ArrowRight from '@/public/assets/common/arrow-right.svg';

const CrewChallengeSection = () => {
  const challenges: CrewChallengeCardProps[] = [
    {
      title: '블랙핑크-뛰어',
      // distance:2.2,
      progress: 70,
      members: ['a', 'b', 'c'],
      id: '1',
      goal: 100,
      runningDistance: 100,
      isRunning: true
    },
    {
      title: '우리 크루, 이번주도 완주 GO!',
      // distance:2.2,
      progress: 70,
      members: ['a', 'b', 'c'],
      id: '2',
      goal: 100,
      runningDistance: 100,
      isRunning: true
    }
  ];
  return (
    <>
      <div className="mt-[37px] flex">
        <p className="text-gray-20 mr-2 flex align-baseline text-[24px] leading-[1.5] font-bold tracking-[-0.025em]">
          내 크루 챌린지
        </p>
        <button>
          <ArrowRight width={24} height={24} />
        </button>
      </div>
      {challenges.map((challenge, index) => (
        <CrewChallengeCard key={index} {...challenge} />
      ))}
    </>
  );
};

export default CrewChallengeSection;
