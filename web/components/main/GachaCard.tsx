'use client';
import React from 'react';
import Card from '@/components/main/Card';
import CloverCountChip from '@/components/common/CloverCountChip';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const GachaCard = ({ cloverCount }: { cloverCount: number }) => {
  const router = useRouter();
  return (
    <Card
      className="bg-primary relative overflow-hidden"
      onClick={() => {
        router.push('/badge-collection/gacha');
      }}
    >
      <div className="z-0 flex justify-center">
        <Image
          alt="뽑기공"
          src="/assets/main/gachaball.svg"
          width={60}
          height={60}
          className="z-20"
        />
      </div>
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgb(32,31,34) 0%, rgba(32,31,34,0.7) 100%)'
        }}
      />
      <div className="relative z-20">
        <div className="mt-4 flex justify-center">
          <CloverCountChip cloverCount={cloverCount} />
        </div>
        <div className="mt-3 text-center text-[1.0625rem] leading-[1.4] font-medium tracking-[-0.025em] whitespace-pre-line text-white">
          {`행운배지\n뽑으러가기`}
        </div>
      </div>
    </Card>
  );
};

export default GachaCard;
