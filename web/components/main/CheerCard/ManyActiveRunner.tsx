import React from 'react';
import { RunningUser } from '@/types/runningUser';
import Image from 'next/image';

function ManyActiveRunner({ runningUser }: { runningUser: RunningUser[] }) {
  return (
    <div className="relative z-20 -mx-2 flex flex-col items-center justify-center pt-1">
      <div className="mt-1 flex flex-row items-center justify-center">
        {runningUser.map((item, index) => (
          <div
            key={item.nickname}
            className={`bg-background z-${(index + 1) * 30} ${index > 0 ? '-ml-8' : ''} flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/10`}
          >
            <Image
              src={item.badgeImageUrl}
              width={40}
              height={40}
              alt={item.nickname}
            />
          </div>
        ))}
      </div>
      <div className="z-10 mt-5 text-center text-[1.0625rem] leading-[1.5] font-bold tracking-[-0.025em]">
        현재 <span className="text-primary z-10">{runningUser.length}</span>
        <span className="whitespace-pre-line text-white">
          {`이\n 뛰고있어요!\n함께 응원해요!`}
        </span>
      </div>
    </div>
  );
}

export default ManyActiveRunner;
