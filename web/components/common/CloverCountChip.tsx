'use client';

function formatClover(count: number) {
  if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return count.toString();
}

function CloverCountChip({ cloverCount }: { cloverCount: number }) {
  return (
    <div className="bg-primary mb-2 max-w-[80px] min-w-[70px] justify-self-center overflow-hidden rounded-full p-1 text-center leading-[1.4] tracking-[-0.025em] text-black/70">
      <span className="text-[1.0625rem] font-semibold">
        {formatClover(cloverCount)}
      </span>
      <span className="font-regular text-[1.0625rem] leading-[1.4] tracking-[-0.025em]">
        /10개
      </span>
    </div>
  );
}

export default CloverCountChip;
