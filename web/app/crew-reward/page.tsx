import React from 'react';
import RunRewardPage from '@/components/running/RunRewardPage';

type PageProps = {
  searchParams: {
    type?: 'crew' | 'personal';
    isSuccess?: 'true' | 'false';
  };
};

function Page({ searchParams }: PageProps) {
  const { type, isSuccess } = searchParams;
  return <RunRewardPage type={type} isSuccess={isSuccess === 'true'} />;
}

export default Page;
