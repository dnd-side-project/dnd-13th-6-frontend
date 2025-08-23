import React from 'react';

function TwoActiveRunner() {
  const members = ['a', 'b'];
  return (
    <div className="relative z-20 -mx-2 flex flex-col items-center justify-center pt-1">
      <div className="mt-1 flex flex-row items-center justify-center">
        {members.map((member, index) => (
          <div
            key={index}
            className={`bg-background z-${(index + 1) * 30} ${index > 0 ? '-ml-10' : ''} flex h-15 w-15 items-center justify-center rounded-full border-2 border-white/10`}
          >
            {member}
          </div>
        ))}
      </div>
      <div className="z-10 mt-5 text-center text-[1.0625rem] leading-[1.5] font-bold tracking-[-0.025em]">
        <span className="text-primary z-10">인생한접시</span>
        <span className="whitespace-pre-line text-white">
          {`님 외 1명이
뛰고 있어요!
함께 응원해요!`}
        </span>
      </div>
    </div>
  );
}

export default TwoActiveRunner;
