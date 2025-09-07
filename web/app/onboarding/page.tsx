'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OnboardingCarousel from '@/components/onBoarding/OnboardingCarousel';
import { useSearchParams } from 'next/navigation';
function Page() {
  const slides: { title: string; text: string; image: string }[] = [
    {
      title: '지금 친구가 \n어디쯤 달리고 있을까?',
      text: '함께 달리며, 행운의 클로버를 보내 응원해보세요.',
      image: 'speedup-pig'
    },
    {
      title: '우리 팀 목표, \n세계의 행운이 함께 응원해요!',
      text: '크루 목표는 매주 확인! 성공할 때마다 클로버 득템!',
      image: 'lucky-day'
    },
    {
      title: '모은 클로버로 \n행운 가챠를 돌려보세요!',
      text: '다양한 행운의 배지들이 크루들을 기다려요!',
      image: 'gacha-ball'
    }
  ];
  const router = useRouter();

  const handleOnboardingComplete = () => {
    router.replace('/login');
  };

  return (
    <OnboardingCarousel slides={slides} onComplete={handleOnboardingComplete} />
  );
}

export default Page;
