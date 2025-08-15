'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StartCountPage() {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (count === 0) {
      router.replace('/running-session');
      return;
    }

    const timer = setTimeout(() => {
      setCount(c => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#201F22]">
      <div className="flex flex-grow items-center justify-center">
        <h1
          className="font-lufga text-[200px] font-extrabold text-[#32FF76] italic"
          style={{ letterSpacing: '-0.15%' }}
        >
          {count > 0 && count}
        </h1>
      </div>
    </div>
  );
}
