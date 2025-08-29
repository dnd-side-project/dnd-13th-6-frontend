'use client';
import React, { useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import DecimalInput from '@/components/common/DecimalInput';
import api from '@/utils/apis/customAxios';
import { GOAL_API } from '@/utils/apis/api';

function Page() {
  const [targetDistance, setTargetDistance] = useState('3.00');
  const router = useRouter();
  const changeTargetDistance = async () => {
    try {
      await api.patch(GOAL_API.CHANGE_TARGET_DISTANCE(), {
        goal: Number(targetDistance)
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-grow flex-col">
      <div>
        <ProgressBar progress={85} className="h-[6px]" />
        <p className="text-gray-20 mt-[51px] text-[26px] leading-[35px] font-bold tracking-[-0.025em] whitespace-pre-line">
          {`이번주 운동 목표를 설정해주세요!`}
        </p>
        <div className="mt-[15vh] flex flex-col items-center">
          <p className="headline inline-block text-xl text-white/80">
            이번 주 러닝 목표 거리
          </p>
          <div className="flex items-center">
            <div className="mt-4 flex items-end space-x-2">
              <DecimalInput
                className="font-lufga border-gray-60 align-center w-50 [appearance:textfield] border-b-2 bg-transparent text-center text-7xl font-extrabold text-white italic focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={targetDistance}
                placeholder="3.00"
                onChange={setTargetDistance}
                onBlur={() => {
                  if (targetDistance !== '') {
                    setTargetDistance(parseFloat(targetDistance).toFixed(2));
                  }
                }}
              />
              <span className="text-100 font-lufga mt-5 text-5xl font-semibold text-gray-50">
                km
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[25vh] mb-[4vh] flex items-center justify-center text-center whitespace-pre-line">
        <p className="text-gray-40 text-[13px] leading-[1.2] tracking-[-0.025em]">
          {
            '크루원들의 주 러닝 목표 거리를 합산해\n 크루 전체 목표가 생성됩니다.'
          }
        </p>
      </div>
      <Button
        className="mb-5 h-15 w-full"
        onClickAction={() => {
          changeTargetDistance();
          router.push('/onboarding/onboarding-finish');
        }}
      >
        시작하기
      </Button>
    </div>
  );
}

export default Page;
