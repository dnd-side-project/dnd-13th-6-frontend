type MemberData =
  | {
      memberId: string;
      nickname: string;
      badgeImageUrl: string;
      isRunning: true;
      runningDistance: number;
      sub: string;
    }
  | {
      memberId: string;
      nickname: string;
      badgeImageUrl: string;
      isRunning: false;
      runningDistance: number;
      sub: null;
    };

interface Crew {
  crewId: string;
  name: string;
  memberCount: string;
  isLeader: boolean;
  badgeImageUrls: Array<string>;
  goal: number;
  runningDistance: number;
  isRunning: boolean;
}

export type { MemberData, Crew };
