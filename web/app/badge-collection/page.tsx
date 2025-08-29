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
import { MEMBER_API, REWARD_API } from '@/utils/apis/api';

function Page() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [defaultBadgeUrl, setDefaultBadgeUrl] = useState<string>('');
  const [cloverCount, setCloverCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [badgeUrl, setBadgeUrl] = useState<string>('');
  const [badgeId, setBadgeId] = useState<string>('');
  const router = useRouter();
  const setHandleSave = useSetAtom(headerSaveAtom);
  const setHandleBack = useSetAtom(headerBackAtom);
  useEffect(() => {
    setNickname(localStorage.getItem('nickname'));
    setBadgeUrl(localStorage.getItem('badgeUrl') || '');
    setDefaultBadgeUrl(localStorage.getItem('badgeUrl') || '');
    getClover();
  }, []);
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

  //TODO:저장버튼 추후 통신 구현
  const actualSave = useCallback(async () => {
    try {
      await api.patch(`${MEMBER_API.CHANGE_BADGE()}`, {
        badgeId: Number(badgeId)
      });
    } catch (error) {
      console.error(error);
    }
  }, [badgeId]);

  const isChanged = useCallback(
    () => defaultBadgeUrl !== badgeUrl,
    [defaultBadgeUrl, badgeUrl]
  );
  const handleBack = useCallback(() => {
    if (isChanged()) {
      setIsModalOpen(true);
    } else {
      router.push('/main');
    }
  }, [isChanged, router]);

  const handleSave = useCallback(() => {
    actualSave();
    router.back();
  }, [router, actualSave]);
  //layout의 버튼에 함수 연결
  useEffect(() => {
    setHandleSave(() => handleSave);
    setHandleBack(() => handleBack);
    return () => {
      setHandleSave(undefined);
      setHandleBack(undefined);
    };
  }, [setHandleSave, handleSave, setHandleBack, handleBack]);

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
        {badgeUrl !== '' && (
          <Image
            src={badgeUrl}
            alt="캐릭터"
            width={120}
            height={120}
            className="h-auto max-h-[100px] w-auto max-w-[100px] object-contain"
          />
        )}
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
      <BadgeList
        setMainBadge={setBadgeUrl}
        badgeUrl={badgeUrl}
        setBadgeId={setBadgeId}
      />
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
