'use client';
import React from 'react';
import BadgeItem from '@/components/gacha/BadgeItem';
import LockBadgeItem from '@/components/gacha/LockBadgeItem';

function BadgeList() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      <BadgeItem />

      <LockBadgeItem />

      <LockBadgeItem />
      <LockBadgeItem />

      <LockBadgeItem />

      <LockBadgeItem />

      <LockBadgeItem />

      <LockBadgeItem />
    </div>
  );
}

export default BadgeList;
