'use client';
import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Page() {
  const [seconds, setSeconds] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (seconds === 3) {
      router.replace('/');
    }
  }, [seconds, router]);

  return (
    <div className="flex flex-col justify-between flex-grow p-4 overflow-hidden">
      <div>
        <ProgressBar progress={100} className="h-[6px]" />
        <div className="flex flex-col items-center">
          <p
            className="text-gray-20 text-[26px] font-bold whitespace-pre-line mt-[51px] leading-[35px]
          tracking-[-0.025em] inline-block text-center justify-center"
          >
            <Image
              src="/assets/LOGO.png"
              alt="onboarding3"
              width={88}
              height={28}
              className="inline-block"
            />
            {`와 함께\n 행운의 첫걸음을 내딛으세요!`}
          </p>
        </div>
        <div className="flex flex-col items-center mt-20">
          <Image
            src="/assets/icon/start.svg"
            alt="start"
            width={243}
            height={243}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
