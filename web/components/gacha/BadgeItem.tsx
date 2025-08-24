import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';

function BadgeItem() {
  return (
    <Card className="h-[114px] w-[114px] p-[7px]">
      <Image
        src={'/assets/icon/speedup-pig.svg'}
        alt={'캐릭터'}
        width={100}
        height={100}
      />
    </Card>
  );
}

export default BadgeItem;
