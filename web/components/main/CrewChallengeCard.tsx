import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';
import ProgressBar from '@/components/common/ProgressBar';

interface CrewChallengeCardProps {
  title: string;
  distance: number;
  progress: number;
  id: string;
  members: string[]; // For now, just strings
  onClick?: () => void;
  onTouchEnd?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const CrewChallengeCard: React.FC<CrewChallengeCardProps> = ({
  title,
  distance,
  progress,
  members,
  onClick,
  className,
  onTouchEnd,
  children,
  id
}) => {
  const isSuccess = true;
  return (
    <Card
      className={`mt-[24px] ${className}`}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex flex-row justify-between gap-2">
        {/* 상단 타이틀 */}
        <div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <p className="text-gray-20 mr-1 text-[17px] leading-[1.5] font-medium tracking-[-0.015em]">
                {title}
              </p>
              <button>
                <Image
                  src="/assets/common/arrow-right.svg"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          {/* 아바타들 */}
          <div className="mt-1 flex flex-row">
            {members && members.map((member, index) => (
              // <div
              //   key={index}
              //   className={`bg-background z-${(index + 1) * 10} ${index > 0 ? '-ml-3' : ''} flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/10`}
              // >
              //   {member}
              // </div>
              <Image
                //next 고유키
                key={`${id}-${member}`}
                src={`/assets/crew/${member}.svg`}
                alt={member}
                width={24}
                height={24}
              />
            ))}
          </div>
        </div>
        {isSuccess ? (
          <span className="font-lufga flex items-baseline text-[33px] font-bold text-[#32FF76]">
            완료
          </span>
        ) : (
          <span className="font-lufga flex items-baseline text-[33px] font-bold italic">
            {distance}
            <span className="ml-1 text-[16px] font-semibold">km</span>
          </span>
        )}
      </div>
      <ProgressBar
        progress={progress}
        className="mt-[16px] h-2"
        backgroundStyle="bg-background"
      />
      {children}
    </Card>
  );
};

export default CrewChallengeCard;
