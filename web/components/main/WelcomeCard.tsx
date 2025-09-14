'use client';
import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

  return (
    <Card
      className="relative mt-[36px] overflow-visible"
      onClick={() => {
        router.push('/badge-collection');
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-2 text-[1.0625rem] leading-[150%] font-medium tracking-tight text-white/70">
            {formatKoreanDate(date)}
          </p>
          <p className="text-gray-20 text-[1.375rem] font-bold whitespace-break-spaces">
            {`안녕하세요,\n${nickname}님`}
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
