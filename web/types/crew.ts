interface MemberData {
  memberId: string;
  nickname: string;
  character: string;
}

interface Crew {
  crewId: string;
  name: string;
  memberCount: string;
  isLeader: true;
  badgeImageUrls: Array<string>;
  goal: number;
  runningDistance: number;
  isRunning: true;
}

export type { MemberData, Crew };
