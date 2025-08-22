'use client';
import React, { useEffect } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-grow flex-col justify-between overflow-hidden">
      <div>
        <ProgressBar progress={100} className="h-[6px]" />
        <div className="flex flex-col items-center">
          <p className="text-gray-20 mt-[51px] inline-block justify-center text-center text-[26px] leading-[35px] font-bold tracking-[-0.025em] whitespace-pre-line">
            <Image
              src="/assets/LOGO.png"
              alt="onboarding3"
              width={88}
              height={28}
              className="inline-block"
            />
            {`와 함께\n 행운의 첫걸음을 시작해요!`}
          </p>
        </div>
        <div className="mt-20 flex flex-col items-center">
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
