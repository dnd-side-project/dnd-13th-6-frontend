'use client';

function formatClover(count: number) {
  if (count >= 1000) {
    return Math.floor(count / 100) / 10 + 'K';
  }
  return count.toString();
}

function CloverCountChip({ cloverCount }: { cloverCount: number }) {
  console.log('chip내부 클로버', cloverCount);
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
