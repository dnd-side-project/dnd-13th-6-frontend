import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';

function BadgeItem() {
  return (
    <Card className="p-[7px]">
      <Image
        src={'/assets/icon/pig.svg'}
        alt={'캐릭터'}
        width={100}
        height={100}
      />
    </Card>
  );
}

export default BadgeItem;
