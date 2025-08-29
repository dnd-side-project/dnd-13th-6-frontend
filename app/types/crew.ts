interface MemberData {
  memberId: string;
  nickname: string;
  badgeImageUrl: string;
  isRunning: boolean;
  runningDistance: number;
  sub: string;
}

interface Crew {
  crewId: number;
  name: string;
  leaderNickname: string;
  notice: string;
  memberCount: number;
  goal: number;
  code: string;
  runningDistance: number;
}
export type { MemberData, Crew };
