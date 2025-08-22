import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';

const CheerCard = () => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(32,31,34,0.82)_0%,rgba(32,31,34,0.6)_100%)]" />
      <Image src="/assets/main/map.png" alt="map" fill className="z-0" />
      <div className="relative z-20 flex-col pt-1">
        <div className="flex justify-center">
          <div className="bg-background z-10 flex h-[60px] w-[60px] justify-center rounded-full">
            <Image
              src="/assets/icon/elephant.svg"
              alt="elephant"
              width={39.5}
              height={35}
            />
          </div>
        </div>
        <div className="z-10 mt-7 justify-self-center text-center font-bold">
          <span className="text-primary z-10">인생한접시</span>
          <span className="whitespace-pre-line text-white">
            {`님이
뛰고 있어요!
함께 응원해요!`}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CheerCard;
