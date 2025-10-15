import React from 'react';
import { RunningUser } from '@/types/runningUser';
import Image from 'next/image';

function OneActiveRunner({ runningUser }: { runningUser: RunningUser[] }) {
  return (
    <div className="relative z-20 flex-col pt-1">
      <div className="flex justify-center">
        <div className="bg-background z-10 flex h-[60px] w-[60px] items-center justify-center rounded-full">
          <Image
            src={runningUser[0].badgeImageUrl}
            width="40"
            height="40"
            alt={runningUser[0].nickname}
          />
        </div>
      </div>
      <div className="z-10 mt-5 justify-self-center text-center font-bold">
        <span className="text-primary z-10">{runningUser[0].nickname}</span>
        <span className="whitespace-pre-line text-white">
          {`님이
뛰고 있어요!
함께 응원해요!`}
        </span>
      </div>
    </div>
  );
}

export default OneActiveRunner;
