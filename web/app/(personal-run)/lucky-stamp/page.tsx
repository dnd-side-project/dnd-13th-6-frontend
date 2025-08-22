'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

export default function LuckyStampPage() {
  const [isSucess, setIsSucess] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100); // 0.1초 후에 나타나기 시작
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex h-full flex-col items-center bg-[#201F22] text-center text-white">
      <div className="flex-grow pt-10">
        <h1 className="onboarding whitespace-pre-line">
          {isSucess
            ? '오늘도 수고 많으셨어요!\n오늘의 행운이 도착했어요!'
            : '클로버는 놓쳤지만\n꾸준함이 곧 행운이에요!'}
        </h1>

        <div className="relative">
          <Image
            src="/assets/common/backgroundLight.svg"
            alt="배경"
            width={325}
            height={325}
            className={`${!isSucess && 'invisible'} object-contain`}
          />
          {isSucess ? (
            <Image
              src="/assets/lucky-stamp/four-leaf-clover.svg"
              alt="Four Leaf Clover"
              width={225}
              height={224}
              priority
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : (
            <Image
              src="/assets/lucky-stamp/disabled-four-leaf-clover.svg"
              alt="disabledFour Leaf Clover"
              width={225}
              height={224}
              priority
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
        {isSucess && (
          <div
            className={`relative mx-auto inline-flex items-center justify-center rounded-[20px] bg-white/13 px-5 py-1 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="pretendard-headline text-gray-20">
              야호! 야생의 클로버를 +1개 얻었다!
            </p>
          </div>
        )}
      </div>
      <div className="w-full pb-9">
        <p className="text-gray-60 font-regular mb-5 text-sm text-[0.9375rem] tracking-[-0.014em]">
          현재 <span className="text-golden">7/10</span>개!{' '}
          <span className="text-golden">3</span>개만 더 모으면 가챠 도전 가능!
        </p>
        <Button onClick={() => router.push('/main')} className="h-15 w-full">
          홈 화면으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
