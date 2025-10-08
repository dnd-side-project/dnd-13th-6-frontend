'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { useGacha } from '@/hooks/queries/useGacha';
import { useCloverCount } from '@/hooks/queries/useCloverCount';
import PickGachaBall from '@/public/assets/gacha/pickgachaball.svg';
import VanillaGachaBall from '@/public/assets/gacha/vanilaGachaBall.svg';
import DisabledGachaBall from '@/public/assets/gacha/disabledgachaball.svg';

const svgMap: { [key: string]: React.ElementType } = {
  '/assets/gacha/pickgachaball.svg': PickGachaBall,
  '/assets/gacha/vanilaGachaBall.svg': VanillaGachaBall,
  '/assets/gacha/disabledgachaball.svg': DisabledGachaBall
};

function Page() {
  const [isAnimating, setIsAnimating] = useState(false);
  const { mutate: gachaMutate } = useGacha();
  const { data: clover = 0 } = useCloverCount();

  const validateCount = () => {
    return clover / 10 >= 1;
  };
  const [nickname, setNickName] = useState('');
  useEffect(() => {
    setNickName(localStorage.getItem('nickname') || '');
  }, []);

  const canDraw = validateCount();
  const [image, setImage] = useState('/assets/gacha/pickgachaball.svg');
  const [isOnClick, setIsOnClick] = useState(false);

  const handleGacha = () => {
    if (validateCount()) {
      setIsOnClick(true);
      setIsAnimating(true);
      setImage('/assets/gacha/vanilaGachaBall.svg');
      setTimeout(() => {
        gachaMutate();
      }, 5000);
    }
  };

  const SvgComponent = svgMap[canDraw ? image : '/assets/gacha/disabledgachaball.svg'];

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden"
      style={{ height: 'calc(100vh - 147px)' }}
    >
      {/* 상단 텍스트 */}
      <p className="onboarding mt-6 mb-[50px] text-center whitespace-pre-line sm:mt-12">
        {canDraw
          ? `${nickname}님을 응원해줄\n행운의 배지는?`
          : `클로버가 조금 부족해요\n러닝으로 더 모아볼까요?`}
      </p>
      {/* 이미지 화면 정중앙 고정 */}
      <SvgComponent
        alt="가챠공"
        width={isOnClick ? 228 : canDraw ? 270 : 228}
        height={isOnClick ? 228 : canDraw ? 270 : 228}
        className={` ${isAnimating ? 'animate-roll' : ''}`}
      />
      {/* 하단 버튼 */}
      <div className="absolute bottom-0 w-full">
        {!isOnClick && (
          <>
            <p className="pretendard-headline2 text-gray-60 mb-[26px] text-center">
              {nickname}님은 가챠뽑기권{' '}
              <span className="text-gray-20">{Math.floor(clover / 10)}장</span>{' '}
              소유중
            </p>
            <Button
              className="mb-5 h-15 w-full"
              disabled={!canDraw}
              onClickAction={handleGacha}
            >
              캐릭터 뽑기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
