'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { MODULE } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';

type RewardType = {
  type?: 'personal' | 'crew';
  isSuccess?: boolean;
  targetDistance?: number;
  remainingDistance?: number;
};

export default function RunRewardPage({
  type = 'crew',
  isSuccess = true,
  remainingDistance
}: RewardType) {
  const [visible, setVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [cloverCount, setCloverCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100); // 0.1초 후에 나타나기 시작
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (type === 'crew') {
      setCloverCount(Number(localStorage.getItem('cloverCount')) || 0);
      setNickname(localStorage.getItem('nickname') || '');
    }
  }, [type]);

  const BottomText = () => {
    if (type === 'crew') {
      if (cloverCount >= 10) {
        return (
          <>
            현재 <span className="text-golden">{cloverCount}/10</span>개! 가챠{' '}
            <span className="text-golden">{Math.floor(cloverCount / 10)}</span>
            번 도전 가능!
          </>
        );
      } else if (cloverCount < 10) {
        return (
          <>
            현재 <span className="text-golden">{cloverCount}/10</span>개!{' '}
            <span className="text-golden">{10 - cloverCount}</span>개만 더
            모으면 가챠 도전 가능!
          </>
        );
      }
    } else {
      if (remainingDistance && remainingDistance >= 0) {
        return (
          <>
            현재{' '}
            <span className="text-golden">목표까지{remainingDistance}</span>KM{' '}
            <span className="text-golden">{10 - cloverCount}</span> 더 뛰면
            클로버 획득 가능!
          </>
        );
      } else {
        <></>;
      }
    }
  };
  const rewardContent = {
    personal: {
      success: {
        title: '이번 주도 수고 많으셨어요!\n오늘의 행운이 도착했어요!',
        image: '/assets/lucky-stamp/four-leaf-clover.svg'
      },
      failure: {
        title: '꾸준함이 곧 행운이에요!\n이번 주도 화이팅',
        image: '/assets/lucky-stamp/disabled-four-leaf-clover.svg'
      }
    },
    crew: {
      success: {
        title: '이번 주 멋지게 해냈어요!\n크루목표 달성 🎉',
        image: '/assets/lucky-stamp/crew-reward-clover.svg'
      },
      failure: {
        title: '이번주는 아쉽게 실패!\n다음 주엔 성공 가즈아!',
        image: '/assets/lucky-stamp/disabled-four-leaf-clover.svg'
      }
    }
  };

  const content = isSuccess
    ? rewardContent[type].success
    : rewardContent[type].failure;

  const onMove = () => {
    const data = {
      url: '/(tabs)/(home)'
    };
    // router.push('/main');
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  };

  return (
    <div className="relative flex h-full flex-col items-center bg-[#201F22] text-center text-white">
      <div className="flex-grow pt-10">
        <h1 className="onboarding whitespace-pre-line">{content.title}</h1>

        <div className="relative">
          <Image
            src="/assets/common/backgroundLight.svg"
            alt="배경"
            width={325}
            height={325}
            className={`${!isSuccess && 'invisible'} object-contain`}
          />
          <Image
            src={content.image}
            alt={isSuccess ? 'Four Leaf Clover' : 'Disabled Four Leaf Clover'}
            width={225}
            height={224}
            priority
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {isSuccess && (
          <div
            className={`relative mx-auto inline-flex items-center justify-center rounded-[20px] bg-white/13 px-5 py-1 transition-opacity duration-1000 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="pretendard-headline text-gray-20">
              야호! 야생의 클로버를 +1개 얻었다!
            </p>
          </div>
        )}
      </div>

      <div className="w-full pb-9">
        <p className="text-gray-60 font-regular mb-5 text-sm text-[0.9375rem] tracking-[-0.014em]">
          {type === 'personal' ? (
            <BottomText />
          ) : (
            <>
              <span className="pretendard-headline2 text-golden">
                {nickname}
              </span>{' '}
              님의 활약으로 팀 목표를 달성했어요 !
            </>
          )}
        </p>

        <Button onClickAction={onMove} className="h-15 w-full">
          홈 화면으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
