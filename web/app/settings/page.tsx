'use client';
import ConfirmModal from '@/components/common/ConfirmModal';
import SettingListItem from '@/components/settings/SettingListItem';
import { useLogout } from '@/hooks/queries/useLogout';
import { redirectToLogin } from '@/utils/authRedirect';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'logout' | 'withdraw'>('logout');
  const router = useRouter();
  const { mutate: logoutMutate } = useLogout();
  const handleConfirm = () => {
    if (type === 'logout') {
      logoutMutate();
    } else {
      // todo: 탈퇴 처리 로직
      console.log('탈퇴 처리');
    }
    localStorage.clear();
    redirectToLogin();
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
          window.open(
            'https://sturdy-hill-971.notion.site/Runky-2733225761d080cc983ed32ecce048e7?pvs=73',
            '_blank'
          );
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
