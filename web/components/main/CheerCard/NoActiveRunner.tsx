import React from 'react';

function NoActiveRunner() {
  return (
    <div className="relative z-20 flex h-full flex-col items-center justify-center text-center">
      <p className="text-[1.0625rem] leading-[1.5] font-bold tracking-[-0.025em] whitespace-pre-line">{`아직 아무도 뛰지\n않고 있어요...`}</p>
    </div>
  );
}

export default NoActiveRunner;
