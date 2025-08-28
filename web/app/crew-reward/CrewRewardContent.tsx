'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import RunRewardPage from '@/components/running/RunRewardPage';

export default function CrewRewardContent() {
  const searchParams = useSearchParams();

  // 쿼리 파라미터를 읽어오는 로직은 그대로 유지합니다.
  const type = (searchParams.get('type') as 'crew' | 'personal') || 'crew';
  const isSuccess = searchParams.get('isSuccess') === 'true';

  return <RunRewardPage type={type} isSuccess={isSuccess} />;
}
