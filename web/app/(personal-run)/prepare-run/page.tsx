'use client';
import React, { useEffect, useState } from 'react';
import GoogleMap from '@/components/GoogleMap/GoogleMap';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function Page() {
  const [targetDistance, setTargetDistance] = useState('');
  const router = useRouter();
  const [onFocus, setOnFocus] = useState(false);
  useEffect(() => {
    const storedTargetDistance = localStorage.getItem('targetDistance');
    if (storedTargetDistance !== null) {
      setTargetDistance(storedTargetDistance);
    }
  }, []);
  const handleStartRun = () => {
    let distance = targetDistance;
    if (distance === '' || distance === '0') distance = '3';

    // 항상 소수점 두 자리
    const formattedDistance = parseFloat(distance).toFixed(2);

    setTargetDistance(formattedDistance); // input에도 반영
    localStorage.setItem('targetDistance', formattedDistance);
    router.push('/start-count');
  };
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

  return (
    <div className="relative h-screen">
      <GoogleMap
        height={'100vh'}
        path={[{ lat: 37.5665, lng: 126.978 }]}
        type="prepare"
      />

      {/* 하단 카드 */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300 ease-in-out ${
          onFocus ? 'bottom-2/3 translate-y-1/2' : 'bottom-10'
        }`}
      >
        {/* 거리 목표 버튼 */}
        <button className="bg-[#1c1c1e]/50 text-white font-medium px-6 py-2 backdrop-blur-sm font-pretendard rounded-full mb-3 text-lg">
          거리 목표
        </button>
        {/* 카드 영역 */}
        <div
          className="bg-[#1c1c1e]/70 rounded-3xl text-center shadow-lg w-[90vw] h-[40vh] p-10 flex flex-col justify-between items-center"
          style={{ backdropFilter: 'blur(1px)' }}
        >
          <p className="text-white/70 text-xl">이번 러닝 목표</p>
          <div className="flex justify-center items-baseline space-x-1 max-w-[320px]">
            <input
              className="w-full bg-transparent border-none font-lufga text-white text-8xl italic font-extrabold text-right focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="text"
              inputMode="decimal"
              value={targetDistance}
              placeholder="3.00"
              onFocus={() => setOnFocus(true)}
              onChange={validateDecimalInput}
              onBlur={() => {
                setOnFocus(false);
                if (targetDistance !== '') {
                  setTargetDistance(parseFloat(targetDistance).toFixed(2));
                }
              }}
            />
            <span className="font-semibold italic text-gray-50 text-3xl font-lufga">
              km
            </span>
          </div>
          <Button
            className="rounded-full p-4 text-xl w-50 mb-5"
            onClick={handleStartRun}
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
