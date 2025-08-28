'use client';
import React from 'react';
import Image from 'next/image';
import CloverCountChip from '@/components/common/CloverCountChip';
import Card from '@/components/main/Card';
import { useRouter } from 'next/navigation';

function GachaRewardCard({ cloverCount }: { cloverCount: number }) {
  const router = useRouter();
  return (
    <Card
      className="bg-primary p-3"
      onClick={() => {
        router.push('/badge-collection/gacha');
      }}
    >
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(32,31,34,1) 0%, rgba(32,31,34,0.5) 100%)'
        }}
      />
      <div className="relative z-20 flex">
        <Image
          src="/assets/main/gachaball.svg"
          alt="가챠 공"
          width={72}
          height={72}
          className="mr-[8px]"
        />
        <div>
          <CloverCountChip cloverCount={cloverCount} />
          <p className="whitespace-pre-line">
            {`클로버를 모으면\n랜덤 가챠 1회권 지급!`}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default GachaRewardCard;
