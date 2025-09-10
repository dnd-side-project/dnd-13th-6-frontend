import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';

function BadgeItem({ badge, badgeUrl }: { badge: string; badgeUrl: string }) {
  return (
    <Card
      className={`relative flex aspect-square w-full items-center justify-center p-[7px] ${badgeUrl === badge ? 'shadow-[0_0_0_1px_theme(colors.primary)] rounded-3xl' : ''}`}
    >
      <Image src={badge} alt="캐릭터" fill className="object-contain p-2" />
    </Card>
  );
}

export default BadgeItem;
