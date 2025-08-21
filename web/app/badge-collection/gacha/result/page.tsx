'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  return (
    <div className="m-h-screen relative flex flex-grow flex-col items-center overflow-hidden">
      <p className="onboarding mt-25 text-center whitespace-pre-line">
        {`2번째\n행운배지를 획득했어요!`}
      </p>
      <div className="relative mt-14 mb-30 flex items-center justify-center">
        {/* 배경 이미지 */}
        <Image
          src="/assets/common/backgroundLight.svg"
          alt="배경"
          width={325}
          height={325}
          className="object-contain"
        />
        {/* 물병 이미지 */}
        <Image
          src="/assets/icon/water.svg"
          alt="물병"
          width={200}
          height={200}
          className="absolute z-10"
        />
      </div>
      <div className="absolute bottom-0 w-full">
        <p className="pretendard-headline2 text-gray-60 mb-6 text-center">
          [사후르]님은 가챠뽑기권 <span className="text-gray-20">1장 </span>
          소유중
        </p>
        <Button
          className="mb-10 h-15 w-full"
          onClick={() => {
            router.push('/main');
          }}
        >
          홈 화면으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

export default Page;
