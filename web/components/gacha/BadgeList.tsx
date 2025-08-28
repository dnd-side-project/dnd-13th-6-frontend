'use client';
import React, { useEffect, useState } from 'react';
import BadgeItem from '@/components/gacha/BadgeItem';
import LockBadgeItem from '@/components/gacha/LockBadgeItem';
import api from '@/utils/apis/customAxios';
import { REWARD_API } from '@/utils/apis/api';

interface Badges {
  badge: string;
}
function BadgeList() {
  const [badges, setBadges] = useState<Badges[]>([]);
  const fetchBadge = async () => {
    try {
      const res = await api.get(REWARD_API.BADGE_LIST());
      setBadges(res.data.result.badges);
      console.log(res.data.result.badges);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBadge();
  }, []);

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
