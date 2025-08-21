import React from 'react';

function CloverCountChip() {
  return (
    <div className="bg-primary w-[70px] justify-self-center rounded-full p-1 text-center leading-[1.4] tracking-[-0.025em] text-black/70">
      <span className="text-[17px] font-semibold">3</span>
      <span className="font-regular text-[17px] leading-[1.4] tracking-[-0.025em]">
        /10개
      </span>
    </div>
  );
}

export default CloverCountChip;
