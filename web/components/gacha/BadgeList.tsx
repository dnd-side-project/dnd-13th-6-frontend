'use client';
import React, { useEffect, useState } from 'react';
import BadgeItem from '@/components/gacha/BadgeItem';
import LockBadgeItem from '@/components/gacha/LockBadgeItem';
import api from '@/utils/apis/customAxios';
import { REWARD_API } from '@/utils/apis/api';

interface Badges {
  badge: string;
  badgeId: string;
}
function BadgeList({
  badgeUrl,
  setMainBadge,
  setBadgeId
}: {
  badgeUrl: string;
  setMainBadge: (badge: string) => void;
  setBadgeId: (id: string) => void;
}) {
  const [badges, setBadges] = useState<Badges[]>([]);
  const fetchBadge = async () => {
    try {
      const res = await api.get(REWARD_API.BADGE_LIST());
      setBadges(res.data.result.badges);
      console.log('가진 뱃지개수:', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBadge();
  }, []);
  return (
    <div className="mt-6 grid grid-cols-3 gap-[10px]">
      {badges.length > 0 &&
        badges.map(badge => (
          <button
            onClick={() => {
              setMainBadge(badge.badge);
              setBadgeId(badge.badgeId);
            }}
            key={badge.badge}
          >
            <BadgeItem badge={badge.badge} badgeUrl={badgeUrl} />
          </button>
        ))}
      {Array.from({ length: 12 - badges.length }).map((_, i) => (
        <LockBadgeItem key={i} />
      ))}
    </div>
  );
}

export default BadgeList;
