'use client';
import React, { useState } from 'react';
import GachaRewardCard from '@/components/gacha/GachaRewardCard';
import Image from 'next/image';
import BadgeList from '@/components/gacha/BadgeList';
import { PencilSimpleLine } from '@phosphor-icons/react';

function Page() {
  const [name, setName] = useState('진수한접시');

  return (
    <div>
      <div className="bg-gray-90 mx-auto flex h-37 w-37 items-center justify-center rounded-full">
        <Image
          src="/assets/icon/pig.svg"
          alt="캐릭터"
          width={120}
          height={120}
        />
      </div>
      <p className="flex flex-col">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="pretendard-title3 text-gray-20 mt-4 mb-4 inline-block w-full flex-col rounded-md text-center"
        />
        <PencilSimpleLine />
        <GachaRewardCard />
      </p>
      <BadgeList />
    </div>
  );
}

export default Page;
