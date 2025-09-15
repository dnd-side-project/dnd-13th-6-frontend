import React from 'react';
import Card from '@/components/main/Card';
import { LockKey } from '@phosphor-icons/react';

function LockBadgeItem() {
  return (
    <Card className="aspect-square w-full p-[7px]">
      <LockKey
        width={50}
        height={50}
        color="#48484A"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </Card>
  );
}

export default LockBadgeItem;
