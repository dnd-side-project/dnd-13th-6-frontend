'use client';
import React, { useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function Page() {
  const [targetDistance, setTargetDistance] = useState('3.0');
  const validateDecimalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // 숫자와 점 이외의 문자 제거
    val = val.replace(/[^0-9.]/g, '');

    // 점이 두 개 이상일 경우 첫 번째 점만 남김
    const dotIndex = val.indexOf('.');
    if (dotIndex > -1) {
      const afterDot = val.substring(dotIndex + 1).replace(/\./g, '');
      val = val.substring(0, dotIndex + 1) + afterDot;
    }

    // 소수점 둘째 자리까지만 허용
    const parts = val.split('.');
    if (parts[1] && parts[1].length > 2) {
      val = `${parts[0]}.${parts[1].substring(0, 2)}`;
    }

    setTargetDistance(val);
  };
  const router = useRouter();
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
              <input
                className="font-lufga border-gray-60 align-center w-50 [appearance:textfield] border-b-2 bg-transparent text-center text-7xl font-extrabold text-white italic focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="text"
                inputMode="decimal"
                value={targetDistance}
                placeholder="3.00"
                onChange={validateDecimalInput}
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
        onClick={() => {
          router.push('/onboarding/onboarding-finish');
        }}
      >
        시작하기
      </Button>
    </div>
  );
}

export default Page;
