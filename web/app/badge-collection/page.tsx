'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import GachaRewardCard from '@/components/gacha/GachaRewardCard';
import Image from 'next/image';
import BadgeList from '@/components/gacha/BadgeList';
import { useSetAtom } from 'jotai';
import { headerBackAtom, headerSaveAtom } from '@/store/header';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/hooks/queries/useUserInfo';
import { useCloverCount } from '@/hooks/queries/useCloverCount';
import { useChangeBadge } from '@/hooks/queries/useChangeBadge';

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [badgeUrl, setBadgeUrl] = useState<string>('');
  const [badgeId, setBadgeId] = useState<string>('');
  const router = useRouter();
  const setHandleSave = useSetAtom(headerSaveAtom);
  const setHandleBack = useSetAtom(headerBackAtom);

  const { data: userInfo } = useUserInfo();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (userInfo && !isInitialized.current) {
      setBadgeUrl(userInfo.badgeUrl || '');
      isInitialized.current = true;
    }
  }, [userInfo]);
  const { data: cloverCount } = useCloverCount();

  const { mutateAsync: changeBadge } = useChangeBadge();

  const actualSave = useCallback(async () => {
    if (badgeId) {
      await changeBadge(Number(badgeId));
    }
  }, [badgeId, changeBadge]);

  const isChanged = useCallback(
    () => userInfo?.badgeUrl !== badgeUrl,
    [userInfo, badgeUrl]
  );
  const handleBack = useCallback(() => {
    if (isChanged()) {
      setIsModalOpen(true);
    } else {
      router.push('/main');
    }
  }, [isChanged, router]);

  const handleSave = useCallback(async () => {
    await actualSave();
    router.push('/main');
  }, [router, actualSave]);

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
    router.push('/main');
  };

  const handleConfirm = async () => {
    await actualSave();
    handleCloseModal();
  };

  return (
    <div>
      <div className="mb-[26px]">
        <GachaRewardCard cloverCount={cloverCount || 0} />
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
          {userInfo?.nickname}
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
      <p className="pretendard-title3">{userInfo?.nickname} 님의 보유 배지</p>
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
