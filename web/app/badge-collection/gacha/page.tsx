'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import api from '@/utils/apis/customAxios';
import { REWARD_API } from '@/utils/apis/api';

function Page() {
  const [clover, setClover] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);
  const validateCount = () => {
    return clover / 10 >= 1;
  };
  const [nickname, setNickName] = useState('');
  useEffect(() => {
    setNickName(localStorage.getItem('nickname') || '');
    setClover(Number(localStorage.getItem('cloverCount')) || 0);
  }, []);

  const canDraw = validateCount();
  const [image, setImage] = useState('/assets/gacha/pickgachaball.svg');
  const [isOnClick, setIsOnClick] = useState(false);
  const router = useRouter();
  const gachaStart = async () => {
    try {
      const res = await api.patch(REWARD_API.GACHA());
      console.log(res.data.result);
      router.push(
        `/badge-collection/gacha/result?id=${res.data?.result.id}&url=${res.data?.result.imageUrl}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleGacha = () => {
    if (validateCount()) {
      setIsOnClick(true);
      setIsAnimating(true);
      setImage('/assets/gacha/vanilaGachaBall.svg');
      setTimeout(() => {
        gachaStart();
      }, 5000);
    }
  };

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
      <Image
        src={canDraw ? image : '/assets/gacha/disabledgachaball.svg'}
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
