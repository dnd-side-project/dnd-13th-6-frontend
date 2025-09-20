'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import NicknameInput from '@/components/onBoarding/NicknameInput';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useSetAtom } from 'jotai/index';
import { headerBackAtom, headerSaveAtom } from '@/store/header';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/hooks/queries/useUserInfo';
import { useSetNickname } from '@/hooks/queries/useSetNickname';
import { AxiosError } from 'axios';

function Page() {
  const [name, setName] = useState('');
  const { data: { nickname: initialNickname = '' } = {} } = useUserInfo();
  const router = useRouter();

  const [helpMessage, setHelpMessage] = useState('');
  const passMessage = '✔ 닉네임이 변경되었습니다.';

  const { mutate, isPending, isSuccess, isError, error } =
    useSetNickname('profile');

  useEffect(() => {
    if (isError && error) {
      if (error instanceof AxiosError && error.response) {
        const apiError = error.response.data as { message: string };
        setHelpMessage(apiError.message || '오류가 발생했습니다.');
      } else {
        setHelpMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [isError, error]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
    setHelpMessage(''); // Reset message on new input
  };

  const actualSave = useCallback(() => {
    if (name) {
      mutate(name);
    }
  }, [name, mutate]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const setHandleSave = useSetAtom(headerSaveAtom);
  const setHandleBack = useSetAtom(headerBackAtom);

  const openSaveModal = useCallback(() => {
    if (name !== initialNickname) {
      setIsModalOpen(true);
    } else {
      router.back();
    }
  }, [name, router, initialNickname]);

  useEffect(() => {
    setName(initialNickname);
  }, [initialNickname]);

  useEffect(() => {
    setHandleSave(() => actualSave);
    setHandleBack(() => openSaveModal);
    return () => {
      setHandleSave(undefined);
      setHandleBack(undefined);
    };
  }, [setHandleSave, openSaveModal, setHandleBack, actualSave]);

  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };
  const handleCloseModal = () => {
    handleOverlayClick();
    router.back();
  };

  const handleConfirm = () => {
    actualSave();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push('/main');
      }, 1000); // Show success message for 1 second
    }
  }, [isSuccess, router]);

  return (
    <div className="flex w-[calc(100vw-32px)] flex-grow flex-col">
      <div className="bg-gray-90 mb-32px mx-auto flex h-37 w-37 items-center justify-center rounded-full">
        <Image
          src="/assets/icon/pig.svg"
          alt="캐릭터"
          width={120}
          height={120}
        />
      </div>
      <p className="mt-[32px]">이름</p>
      <div>
        <NicknameInput
          type="profile"
          nickname={name}
          onNicknameChange={handleNicknameChange}
          helpMessage={helpMessage}
          isError={isError}
          isSuccess={isSuccess}
          passMessage={passMessage}
          isPending={isPending}
          onSubmit={actualSave}
        />
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onOverlayClick={handleOverlayClick}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="변경사항을 저장할까요?"
        closeText="그냥 나가기"
        confirmText="저장하기"
        confirmBtnStyle="bg-primary text-black"
      />
    </div>
  );
}

export default Page;
