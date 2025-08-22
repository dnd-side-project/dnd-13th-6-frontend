import React from 'react';
import GachaRewardCard from '@/components/gacha/GachaRewardCard';
import Image from 'next/image';
import BadgeList from '@/components/gacha/BadgeList';

function Page() {
  return (
    <>
      <GachaRewardCard />
      <div className="pretendard-headline mt-[33px] text-center text-[19px]">
        진수한접시님의 보유 배지
      </div>

      <Image
        src={'/assets/icon/pig.svg'}
        alt={'캐릭터'}
        width={156}
        height={156}
        className="mx-auto mt-[14px]"
      />
      <BadgeList />
    </>
  );
}

export default Page;
