'use client';
import React, { useEffect, useRef, useState } from 'react';
import GachaRewardCard from '@/components/gacha/GachaRewardCard';
import Image from 'next/image';
import BadgeList from '@/components/gacha/BadgeList';
import { PencilSimpleLine } from '@phosphor-icons/react';

function Page() {
  const [name, setName] = useState('진수한접시');
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEdit, setIsEdit] = useState(false);
  const handleIconClick = () => {
    setIsEdit(true);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

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

      <div className="mt-7 mb-8 flex items-center justify-center">
        {isEdit ? (
          <>
            <input
              ref={inputRef}
              value={name}
              onBlur={() => setIsEdit(false)}
              onChange={e => setName(e.target.value)}
              className="font-pretendard w-auto bg-transparent text-center text-[22px] font-bold text-white focus:outline-none"
            />
          </>
        ) : (
          <>
            <p className="font-pretendard w-auto bg-transparent text-center text-[22px] font-bold text-white">
              {name}
            </p>
            <span className="font-pretendard mr-2 w-auto bg-transparent text-center text-[22px] font-bold text-white">
              님
            </span>
            <PencilSimpleLine
              size={20}
              className="cursor-pointer text-gray-400"
              onClick={handleIconClick}
            />
          </>
        )}
      </div>
      <GachaRewardCard />

      <BadgeList />
    </div>
  );
}

export default Page;
