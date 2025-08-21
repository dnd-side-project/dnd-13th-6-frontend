import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';

function Page() {
  const clover = 2;
  const validateCount = () => {
    return clover / 10 >= 1;
  };

  return (
    <div className="relative flex flex-grow flex-col items-center">
      <p className="onboarding mt-[47px] text-center whitespace-pre-line">
        {validateCount()
          ? `오늘의 행운\n배지를 뽑아보세요!`
          : `클로버가 조금 부족해요\n러닝으로 더 모아볼까요?`}
      </p>

      <Image
        src={
          validateCount()
            ? '/assets/gacha/pickgachaball.svg'
            : '/assets/gacha/disabledgachaball.svg'
        }
        alt={'가챠공'}
        width={validateCount() ? 270 : 228}
        height={validateCount() ? 270 : 228}
        className="mx-auto mt-[52px]"
      />

      <div className="absolute bottom-0 w-full">
        <p className="pretendard-headline2 text-gray-60 mb-[26px] text-center">
          [사후르]님은 가챠뽑기권 <span className="text-gray-20">1장</span>{' '}
          소유중
        </p>
        <Button className="mb-5 h-15 w-full" disabled={!validateCount()}>
          캐릭터 뽑기
        </Button>
      </div>
    </div>
  );
}

export default Page;
