'use client';
import React, { useEffect, useState } from 'react';
import GoogleMap from '@/components/googleMap/GoogleMap';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

interface Position {
  lat: number;
  lng: number;
}
function Page() {
  const [targetDistance, setTargetDistance] = useState('');
  const router = useRouter();
  const [onFocus, setOnFocus] = useState(false);
  const [position, setPosition] = useState<Position>({
    lat: 37.5665,
    lng: 126.978
  });
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
  //이벤트 등록
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'RUNNING_PREPARE') {
          setPosition(JSON.parse(data.message) as Position);
        }
      } catch (error) {
        console.error('error:', error);
      }
    };
    // Android
    document.addEventListener('message', handleMessage as EventListener);
    // iOS
    window.addEventListener('message', handleMessage);
    return () => {
      //Android
      document.removeEventListener('message', handleMessage as EventListener);
      //iOS
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="relative h-screen">
      <GoogleMap height={'100vh'} path={[position]} type="prepare" />

      {/* 하단 카드 */}
      <div
        className={`absolute left-1/2 flex -translate-x-1/2 flex-col items-center transition-all duration-300 ease-in-out ${
          onFocus ? 'bottom-2/3 translate-y-1/2' : 'bottom-10'
        }`}
      >
        {/* 거리 목표 버튼 */}
        <button className="font-pretendard mb-3 rounded-full bg-[#1c1c1e]/50 px-6 py-2 text-lg font-medium text-white backdrop-blur-sm">
          거리 목표
        </button>
        {/* 카드 영역 */}
        <div
          className="flex h-[40vh] w-[90vw] flex-col items-center justify-between rounded-3xl bg-[#1c1c1e]/70 p-10 text-center shadow-lg"
          style={{ backdropFilter: 'blur(1px)' }}
        >
          <p className="text-xl text-white/70">이번 러닝 목표</p>
          <div className="flex max-w-[320px] items-baseline justify-center space-x-1">
            <input
              className="font-lufga w-full [appearance:textfield] border-none bg-transparent text-right text-8xl font-extrabold text-white italic focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
            <span className="font-lufga text-3xl font-semibold text-gray-50 italic">
              km
            </span>
          </div>
          <Button
            className="mb-5 w-50 rounded-full p-4 text-xl"
            onClickAction={handleStartRun}
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
