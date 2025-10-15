'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const BASE_FONT_SIZE_REM = 1.375;
function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1; // 0~11이므로 +1
  const day = date.getDate();
  const weekDays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일'
  ];
  const weekDay = weekDays[date.getDay()];
  return `${month}월 ${day}일 ${weekDay}`;
}
const WelcomeCard = ({
  nickname,
  badgeUrl,
  badgeId
}: {
  nickname: string;
  badgeUrl: string;
  badgeId: number;
}) => {
  const router = useRouter();
  const date = new Date();
  const nicknameRef = useRef<HTMLParagraphElement>(null);
  const [nicknameFontSize, setNicknameFontSize] = useState('1.375rem');

  useLayoutEffect(() => {
    const nicknameEl = nicknameRef.current;
    if (!nicknameEl || !nicknameEl.parentElement) return;

    nicknameEl.style.fontSize = `${BASE_FONT_SIZE_REM}rem`;

    const containerWidth = nicknameEl.parentElement.clientWidth;
    const textWidth = nicknameEl.scrollWidth;

    if (textWidth > containerWidth) {
      const newFontSize = (BASE_FONT_SIZE_REM * containerWidth) / textWidth;
      setNicknameFontSize(`${newFontSize}rem`);
    } else {
      setNicknameFontSize(`${BASE_FONT_SIZE_REM}rem`);
    }
  }, [nickname]);

  return (
    <Card
      className="relative mt-[36px] overflow-visible"
      onClick={() => {
        router.push('/badge-collection');
      }}
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-[1.0625rem] leading-[150%] font-medium tracking-tight text-white/70">
            {formatKoreanDate(date)}
          </p>
          <p className="text-gray-20 text-[1.375rem] font-bold">안녕하세요,</p>
          <p
            ref={nicknameRef}
            className="text-gray-20 font-bold whitespace-nowrap"
            style={{ fontSize: nicknameFontSize }}
          >
            {nickname}님
          </p>
        </div>
        <div
          className={`relative -mt-16 ${badgeId == 6 ? 'rotate-0' : 'rotate-20'}`}
          style={{
            width: badgeId === 4 ? 140 : 166,
            height: badgeId === 4 ? 140 : 166
          }}
        >
          {badgeUrl !== '' && (
            <Image
              src={badgeUrl}
              alt={'character'}
              fill
              className="object-contain"
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default WelcomeCard;
