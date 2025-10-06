'use client';
import React from 'react';
import GachaRewardCard from '@/components/gacha/GachaRewardCard';
import Image from 'next/image';
import BadgeList from '@/components/gacha/BadgeList';
import { useBadgeCollection } from '@/hooks/useBadgeCollection';
import { useHeaderControls } from '@/hooks/useHeaderControls';

function Page() {
  const {
    badgeUrl,
    cloverCount,
    userInfo,
    setBadgeUrl,
    setBadgeId,
    handleSave,
    handleBack,
  } = useBadgeCollection();

  useHeaderControls({ onSave: handleSave, onBack: handleBack });

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

      <div className="mt-[25px] mb-4 flex items-center justify-center"></div>

      <p className="pretendard-title3">{userInfo?.nickname} 님의 보유 배지</p>
      <BadgeList
        setMainBadge={setBadgeUrl}
        badgeUrl={badgeUrl}
        setBadgeId={setBadgeId}
      />
    </div>
  );
}

export default Page;