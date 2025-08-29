'use client';

import React, { Suspense } from 'react';
import CrewRewardContent from '@/app/crew-reward/CrewRewardContent';

// 로딩 중에 보여줄 간단한 UI (나중에 스켈레톤 UI나 스피너로 교체하면 좋습니다)
function LoadingFallback() {
  return <div>Loading...</div>;
}

export default function CrewRewardPage() {
  return (
    // Suspense로 감싸고 fallback으로 로딩 상태 UI를 지정합니다.
    <Suspense fallback={<LoadingFallback />}>
      <CrewRewardContent />
    </Suspense>
  );
}
