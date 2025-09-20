'use client';
import SettingListItem from '@/components/settings/SettingListItem';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Settings() {
  const router = useRouter();
  return (
    <div>
      <SettingListItem
        text="닉네임 변경"
        onClick={() => {
          router.push('settings/edit-nickname');
        }}
      />
      <div className="bg-gray-90 mr-[-16px] ml-[-16px] h-2" />
      <SettingListItem text="개인정보 보호 정책" />
      <SettingListItem text="어쩌구 정책" />
      <div className="bg-gray-90 mr-[-16px] ml-[-16px] h-2" />
      <SettingListItem text="로그아웃" />
      <SettingListItem text="탈퇴하기" />
    </div>
  );
}
