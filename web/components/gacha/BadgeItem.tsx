import React from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';

function BadgeItem({ badge, badgeUrl }: { badge: string; badgeUrl: string }) {
  return (
    <Card
      className={`\`relative flex h-[114px] w-[114px] items-center justify-center p-[7px] ${
        badgeUrl === badge
          ? 'shadow-[0_0_0_1px_theme(colors.primary)] rounded-3xl'
          : ''
      }\``}
    >
      className={}
      <Image
        src={badge}
        alt="캐릭터"
        width={100}
        height={100}
        className="h-auto max-h-[100px] w-auto max-w-[100px] object-contain"
      />
    </Card>
  );
}

export default BadgeItem;
