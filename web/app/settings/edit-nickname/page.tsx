'use client';
import React from 'react';
import NicknameInput from '@/components/onBoarding/NicknameInput';
import { useEditNickname } from '@/hooks/user/useEditNickname';
import Pig from '@/public/assets/icon/pig.svg';

function Page() {
  const {
    name,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    passMessage,
    handleNicknameChange,
    actualSave
  } = useEditNickname();

  return (
    <div className="flex w-[calc(100vw-32px)] flex-grow flex-col">
      <div className="bg-gray-90 mb-32px mx-auto flex h-37 w-37 items-center justify-center rounded-full">
        <Pig width={120} height={120} />
      </div>
      <p className="mt-[32px]">이름</p>
      <div>
        <NicknameInput
          type="profile"
          nickname={name}
          onNicknameChange={handleNicknameChange}
          helpMessage={errorMessage}
          isError={isError}
          isSuccess={isSuccess}
          passMessage={passMessage}
          isPending={isPending}
          onSubmit={actualSave}
        />
      </div>
    </div>
  );
}

export default Page;
