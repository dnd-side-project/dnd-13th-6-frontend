'use client';
import ConfirmModal from '@/components/common/ConfirmModal';
import SettingListItem from '@/components/settings/SettingListItem';
import { useLogout } from '@/hooks/queries/useLogout';
import { useWithdraw } from '@/hooks/queries/useWithdraw';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'logout' | 'withdraw'>('logout');
  const router = useRouter();
  const { mutate: logoutMutate } = useLogout();
  const { mutate: withdrawMutate } = useWithdraw();
  const handleConfirm = async () => {
    if (type === 'logout') {
      logoutMutate();
    } else {
      withdrawMutate();
    }
  };
  return (
    <div>
      <SettingListItem
        text="닉네임 변경"
        onClick={() => {
          router.push('settings/edit-nickname');
        }}
      />
      <div className="bg-gray-90 mr-[-16px] ml-[-16px] h-2" />
      <SettingListItem
        text="개인정보 보호 정책"
        onClick={() => {
          window.open(process.env.NEXT_PUBLIC_TERMS_URL, '_blank');
        }}
      />
      <div className="bg-gray-90 mr-[-16px] ml-[-16px] h-2" />
      <SettingListItem
        text="로그아웃"
        onClick={() => {
          setType('logout');
          setIsOpen(true);
        }}
      />
      <SettingListItem
        text="탈퇴하기"
        onClick={() => {
          setType('withdraw');
          setIsOpen(true);
        }}
      />
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={handleConfirm}
        title={`${type === 'logout' ? '로그아웃' : '탈퇴'} 하시겠습니까?`}
        confirmText={`${type === 'logout' ? '로그아웃' : '탈퇴하기'}`}
        closeText="취소"
      />
    </div>
  );
}
