export const queryKeys = {
  member: {
    all: ['member'] as const,
    info: () => [...queryKeys.member.all, 'info'] as const,
    nickname: () => [...queryKeys.member.all, 'nickname'] as const,
    badge: (memberId: string | number) =>
      [...queryKeys.member.all, 'badge', memberId] as const,
  },
  reward: {
    all: ['reward'] as const,
    cloverCount: () => [...queryKeys.reward.all, 'cloverCount'] as const,
    badgeList: () => [...queryKeys.reward.all, 'badgeList'] as const,
    gacha: () => [...queryKeys.reward.all, 'gacha'] as const,
  },
  notification: {
    all: ['notification'] as const,
    list: () => [...queryKeys.notification.all, 'list'] as const,
  },
  goal: {
    all: ['goal'] as const,
    goalDistance: () => [...queryKeys.goal.all, 'goalDistance'] as const,
  },
  running: {
    all: ['running'] as const,
    today: () => [...queryKeys.running.all, 'today'] as const,
    weekly: () => [...queryKeys.running.all, 'weekly'] as const,
  },
};