'use client';
import React, { useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import CharacterCarousel from '@/components/onBoarding/CharacterCarousel';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBadge } from '@/utils/queries/member';
import { queryKeys } from '@/utils/queries/queryKeys';

function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const characters = [
    { image: 'pig', id: '1' },
    { image: 'elephant', id: '2' }
  ];

  const [selectedId, setSelectedId] = useState(0);

  const { mutate: changeBadge, isPending } = useMutation({
    mutationFn: updateBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.member.info() });
      router.push('/onboarding/setup-target');
    }
  });

  const handleNext = () => {
    changeBadge(selectedId + 1);
  };
  return (
    <div className="flex flex-grow flex-col justify-between overflow-hidden">
      <div>
        <ProgressBar progress={70} className="h-[6px]" />
        <p className="text-gray-20 mt-[51px] text-[26px] leading-[35px] font-bold tracking-[-0.025em] whitespace-pre-line">
          {`반가워요\n함께 할 행운 배지를 골라주세요!`}
        </p>
      </div>

      <CharacterCarousel
        characters={characters}
        index={selectedId}
        setIndex={setSelectedId}
      />

      <div className="mb-[4vh] flex items-center justify-center text-center whitespace-pre-line">
        <p className="text-gray-40 text-[13px] leading-[1.2] tracking-[-0.025em]">
          {
            '다양한 세계의 행운을 상징하는\n배지들이 당신의 목표를 응원해요\n클로버를 모아 새로운 행운을 만나보세요'
          }
        </p>
      </div>
      <Button
        className="mb-5 h-15 w-full"
        onClickAction={handleNext}
        disabled={isPending}
      >
        {isPending ? '저장 중...' : '다음으로'}
      </Button>
    </div>
  );
}

export default Page;
