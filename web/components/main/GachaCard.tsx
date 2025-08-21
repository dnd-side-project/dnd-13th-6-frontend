import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';

const GachaCard = () => {
  return (
    <Card className="bg-primary relative overflow-hidden">
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgb(32,31,34) 0%, rgba(32,31,34,0.7) 100%)'
        }}
      />
      <div className="relative z-20">
        <div className="flex justify-center">
          <div className="bg-primary w-[70px] justify-self-center rounded-full p-1 text-center text-black/70">
            <span className="body1">3</span>
            <span className="body1 font-medium">
              /10개
            </span>
          </div>
        </div>
        <div className="pretendard-headline2 mt-3 whitespace-pre-line text-center text-white">
          {`클로버를 모으면
 랜덤 가챠 1회권 지급!`}
        </div>
        <div className="flex justify-center">
          <Image
            alt="뽑기공"
            src="/assets/main/gachaball.svg"
            width={90}
            height={90}
          />
        </div>
      </div>
    </Card>
  );
};

export default GachaCard;
