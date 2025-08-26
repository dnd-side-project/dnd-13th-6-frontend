'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import NicknameInput from '@/components/onBoarding/NicknameInput';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useSetAtom } from 'jotai/index';
import { headerBackAtom, headerSaveAtom } from '@/store/header';
import { useRouter } from 'next/navigation';

function Page() {
  const [name, setName] = useState('진수한접시');
  const defaultName = '진수한접시';
  const router = useRouter();
  //TODO:저장버튼 추후 통신 구현
  const actualSave = useCallback(() => {
    router.push('/main');
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setHandleSave = useSetAtom(headerSaveAtom);
  const setHandleBack = useSetAtom(headerBackAtom);
  // 값이 변경되었을때 모달 띄우기
  const openSaveModal = useCallback(() => {
    if (name !== defaultName) {
      setIsModalOpen(true);
    } else {
      router.push('/main');
    }
  }, [name, router, defaultName]);
  //layout의 버튼에 함수 연결
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
    handleCloseModal();
  };
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
        <NicknameInput type="profile" />
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
