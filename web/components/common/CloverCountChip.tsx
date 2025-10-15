'use client';

function formatClover(count: number) {
  const units = ['', 'K', 'M', 'B', 'T']; // Thousand, Million, Billion, Trillion
  let unitIndex = 0;

  while (count >= 1000 && unitIndex < units.length - 1) {
    count /= 1000;
    unitIndex++;
  }
  // 소수점 한 자리까지 표시 (예: 1.2K, 3.5M)
  const formatted = count % 1 === 0 ? count.toString() : count.toFixed(1);

  return formatted + units[unitIndex];
}

function CloverCountChip({ cloverCount }: { cloverCount: number }) {
  return (
    <div className="bg-primary mb-2 max-w-[100px] min-w-[70px] overflow-hidden rounded-full p-1 text-center leading-[1.4] tracking-[-0.025em] text-black/70">
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
