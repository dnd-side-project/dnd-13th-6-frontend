'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import RunRewardPage from '@/components/running/RunRewardPage';

export default function Page() {
  // useSearchParams() 훅으로 클라이언트에서 안전하게 searchParams 접근
  const searchParams = useSearchParams();

  // 문자열 쿼리를 가져오고, 없으면 기본값
  const type = (searchParams.get('type') as 'crew' | 'personal') || 'crew';
  const isSuccess = searchParams.get('isSuccess') === 'true';

  return <RunRewardPage type={type} isSuccess={isSuccess} />;
}
