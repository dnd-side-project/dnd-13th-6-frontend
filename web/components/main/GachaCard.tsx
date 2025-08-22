'use client';
import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';
import CloverCountChip from '@/components/common/CloverCountChip';
import { useRouter } from 'next/navigation';

const GachaCard = () => {
  const router = useRouter();
  return (
    <Card
      className="bg-primary relative overflow-hidden"
      onClick={() => {
        router.push('/badge-collection/gacha');
      }}
    >
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgb(32,31,34) 0%, rgba(32,31,34,0.7) 100%)'
        }}
      />
      <div className="relative z-20">
        <div className="flex justify-center">
          <CloverCountChip />
        </div>
        <div className="mt-3 text-center text-[15px] leading-[1.4] font-medium tracking-[-0.025em] whitespace-pre-line text-white">
          {`클로버를 모으면
 랜덤 가챠 1회권 지급!`}
        </div>
        <div className="mt-1 flex justify-center">
          <Image
            alt="뽑기공"
            src="/assets/main/gachaball.svg"
            width={85}
            height={85}
          />
        </div>
      </div>
    </Card>
  );
};

export default GachaCard;
