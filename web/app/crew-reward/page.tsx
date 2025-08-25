import React from 'react';
import RunRewardPage from '@/components/running/RunRewardPage';

function Page(props: {
  searchParams: { type: 'crew' | 'personal'; isSuccess: 'true' | 'false' };
}) {
  const { type, isSuccess } = props.searchParams;
  return <RunRewardPage type={type} isSuccess={isSuccess} />;
}

export default Page;
