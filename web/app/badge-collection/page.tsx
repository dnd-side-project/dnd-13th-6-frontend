'use client';
import React, { useCallback, useEffect, useState } from 'react';
import GachaRewardCard from '@/components/gacha/GachaRewardCard';
import Image from 'next/image';
import BadgeList from '@/components/gacha/BadgeList';
import { useSetAtom } from 'jotai';
import { headerBackAtom, headerSaveAtom } from '@/store/header';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useRouter } from 'next/navigation';
import api from '@/utils/apis/customAxios';
import { REWARD_API } from '@/utils/apis/api';

function Page() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [cloverCount, setCloverCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const setHandleSave = useSetAtom(headerSaveAtom);
  const setHandleBack = useSetAtom(headerBackAtom);

  useEffect(() => {
    setNickname(localStorage.getItem('nickname'));
  }, []);

  useEffect(() => {
    const getClover = async () => {
      try {
        const res = await api.get(`${REWARD_API.CLOVER()}`);
        const clover = res.data.result.count;
        setCloverCount(clover);
        localStorage.setItem('cloverCount', clover);
      } catch (err) {
        console.log(err);
      }
    };
    getClover();
  }, []);

  //TODO:저장버튼 추후 통신 구현
  const actualSave = useCallback(() => {
    router.push('/main');
  }, [router]);
  // 값이 변경되었을때 모달 띄우기
  //TODO:배지 비교
  const openSaveModal = useCallback(() => {
    router.push('/main');
  }, [router]);
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
    <div>
      <div className="mb-[26px]">
        <GachaRewardCard cloverCount={cloverCount} />
      </div>
      <div className="bg-gray-90 mx-auto flex h-37 w-37 items-center justify-center rounded-full">
        <Image
          src="/assets/icon/pig.svg"
          alt="캐릭터"
          width={120}
          height={120}
        />
      </div>

      <div className="mt-[25px] mb-4 flex items-center justify-center">
        <p className="font-pretendard w-auto bg-transparent text-center text-[22px] font-bold text-white">
          {nickname}
        </p>
        <span className="font-pretendard mr-2 w-auto bg-transparent text-center text-[22px] font-bold text-white">
          님
        </span>
      </div>
      <div className="mb-[36px] flex justify-center">
        <button
          className="border-gray-20 rounded-full border-1 bg-white/10 px-[12px] py-[6px]"
          onClick={() => router.push('/badge-collection/edit-nickname')}
        >
          <p className="text-gray-20 text-[17px] font-medium tracking-[-0.014em]">
            수정
          </p>
        </button>
      </div>
      <p className="pretendard-title3">{nickname} 님의 보유 배지</p>
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
