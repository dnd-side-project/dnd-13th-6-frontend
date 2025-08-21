'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  return (
    <div className="relative flex flex-grow flex-col items-center overflow-hidden">
      <p className="onboarding mt-[47px] text-center whitespace-pre-line">
        {`2번째\n행운배지를 획득했어요!`}
      </p>
      <div className={'mb-30 flex flex-1 justify-center'}>
        <Image
          src={'/assets/icon/pig.svg'}
          alt={'가챠공'}
          width={325}
          height={325}
        />
      </div>
      <div className="absolute bottom-0 w-full">
        <p className="pretendard-headline2 text-gray-60 mb-[26px] text-center">
          [사후르]님은 가챠뽑기권 <span className="text-gray-20">1장 </span>
          소유중
        </p>
        <Button
          className="mb-5 h-15 w-full"
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
