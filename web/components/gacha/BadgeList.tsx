'use client';
import React from 'react';
import BadgeItem from '@/components/gacha/BadgeItem';
import LockBadgeItem from '@/components/gacha/LockBadgeItem';
import { useBadges } from '@/hooks/queries/useBadges';

function BadgeList({
  badgeUrl,
  setMainBadge,
  setBadgeId,
}: {
  badgeUrl: string;
  setMainBadge: (badge: string) => void;
  setBadgeId: (id: string) => void;
}) {
  const { data: badgesData, isLoading, isError } = useBadges();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching badges.</div>;
  }

  const badges = badgesData?.badges || [];

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
