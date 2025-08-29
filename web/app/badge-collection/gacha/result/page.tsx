import { Suspense } from 'react';
import ResultPage from '@/components/gacha/ResultPage';

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPage />
    </Suspense>
  );
}

export default Page;
