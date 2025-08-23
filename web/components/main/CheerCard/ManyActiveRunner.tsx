import React from 'react';

function ManyActiveRunner() {
  const members = ['a', 'b', 'c', 'd', 'e'];
  return (
    <div className="relative z-20 -mx-2 flex flex-col items-center justify-center pt-1">
      <div className="mt-1 flex flex-row items-center justify-center">
        {members.map((member, index) => (
          <div
            key={index}
            className={`bg-background z-${(index + 1) * 30} ${index > 0 ? '-ml-8' : ''} flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/10`}
          >
            {member}
          </div>
        ))}
      </div>
      <div className="z-10 mt-5 text-center text-[1.0625rem] leading-[1.5] font-bold tracking-[-0.025em]">
        현재 <span className="text-primary z-10">크루원 5명</span>
        <span className="whitespace-pre-line text-white">
          {`이\n 뛰고있어요!\n함께 응원해요!`}
        </span>
      </div>
    </div>
  );
}

export default ManyActiveRunner;
