'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/hooks/queries/useUserInfo';
import { useCloverCount } from '@/hooks/queries/useCloverCount';
import { useChangeBadge } from '@/hooks/queries/useChangeBadge';
import { useConfirmModal } from '@/hooks/useConfirmModal';

export const useBadgeCollection = () => {
  const [badgeUrl, setBadgeUrl] = useState<string>('');
  const [badgeId, setBadgeId] = useState<string>('');
  const router = useRouter();
  const { openConfirm } = useConfirmModal();

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
      openConfirm({
        title: '변경사항을 저장할까요?',
        closeText: '그냥 나가기',
        confirmText: '저장하기',
        confirmBtnStyle: 'bg-primary text-black',
        onConfirm: async () => {
          await actualSave();
          router.push('/main');
        },
        onClose: () => {
          router.push('/main');
        }
      });
    } else {
      router.push('/main');
    }
  }, [isChanged, router, openConfirm, actualSave]);

  const handleSave = useCallback(async () => {
    await actualSave();
    router.push('/main');
  }, [router, actualSave]);

  return {
    badgeUrl,
    cloverCount,
    userInfo,
    setBadgeUrl,
    setBadgeId,
    badgeId,
    handleSave,
    handleBack
  };
};
