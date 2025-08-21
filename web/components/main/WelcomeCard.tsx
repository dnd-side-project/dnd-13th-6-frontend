import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';

const WelcomeCard = () => {
  return (
    <Card className="relative mt-[36px] overflow-visible">
      <div className="flex items-center justify-start">
        <div>
          <p className="body1 mb-2 text-white/70">
            8월 15일 금요일
          </p>
          <p className="pretendard-title3 text-gray-20 whitespace-break-spaces">
            {`안녕하세요,
진수한접시님`}
          </p>
        </div>
        <div>
          <Image
            src={'/assets/icon/pig.svg'}
            alt={'character'}
            width={180}
            height={180}
            className="absolute -top-10 right-0 left-39 rotate-20"
          />
        </div>
      </div>
    </Card>
  );
};

export default WelcomeCard;
