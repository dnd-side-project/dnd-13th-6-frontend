'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import GachaRewardCard from '@/components/gacha/GachaRewardCard';
import Image from 'next/image';
import BadgeList from '@/components/gacha/BadgeList';
import { PencilSimpleLine } from '@phosphor-icons/react';
import { useSetAtom } from 'jotai';
import { headerBackAtom, headerSaveAtom } from '@/store/header';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useRouter } from 'next/navigation';

function Page() {
  const [name, setName] = useState('진수한접시');
  const defaultName = '진수한접시';
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const setHandleSave = useSetAtom(headerSaveAtom);
  const setHandleBack = useSetAtom(headerBackAtom);

  //TODO:저장버튼 추후 통신 구현
  const actualSave = useCallback(() => {
    setIsEdit(false);
    router.push('/main');
  }, []);
  // 값이 변경되었을때 모달 띄우기
  //TODO:배지 비교도 추가해야함
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
  //edit 버튼 눌렀을때
  const handleIconClick = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

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
