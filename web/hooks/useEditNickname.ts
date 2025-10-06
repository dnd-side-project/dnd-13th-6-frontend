'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/hooks/queries/useUserInfo';
import { useSetNickname } from '@/hooks/queries/useSetNickname';
import { useHeaderControls } from '@/hooks/useHeaderControls';
import { useGlobalConfirmModal } from '@/hooks/useGlobalConfirmModal';

export const useEditNickname = () => {
  const [name, setName] = useState('');
  const { data: { nickname: initialNickname = '' } = {} } = useUserInfo();
  const router = useRouter();
  const { openModal } = useGlobalConfirmModal();

  const passMessage = '✔ 닉네임이 변경되었습니다.';

  const { mutate, isPending, isSuccess, isError, errorMessage, setErrorMessage } =
    useSetNickname('profile');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
    setErrorMessage('');
  };

  const actualSave = useCallback(() => {
    if (name) {
      mutate(name);
    }
  }, [name, mutate]);

  const openSaveModal = useCallback(() => {
    if (name !== initialNickname) {
      openModal({
        title: '변경사항을 저장할까요?',
        onConfirm: actualSave,
        onClose: () => router.back(),
      });
    } else {
      router.back();
    }
  }, [name, router, initialNickname, openModal, actualSave]);

  useHeaderControls({ onSave: actualSave, onBack: openSaveModal });

  useEffect(() => {
    setName(initialNickname);
  }, [initialNickname]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push('/main');
      }, 1000);
    }
  }, [isSuccess, router]);

  return {
    name,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    passMessage,
    handleNicknameChange,
    actualSave,
  };
};
