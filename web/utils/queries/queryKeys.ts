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
    //이번주 목표 거리
    goalDistance: () => [...queryKeys.goal.all, 'goalDistance'] as const,
  },
  running: {
    all: ['running'] as const,
    //오늘 달린 기록
    today: () => [...queryKeys.running.all, 'today'] as const,
    //이번주 달린 기록
    weeklyStats: () => [...queryKeys.goal.all, 'weeklyStats'] as const,
  },
  crew: {
    all: ['crew'] as const,
    //같은 크루 달리고 있는 사람 확인
    running: () => [...queryKeys.crew.all, 'running'] as const,
  },
};