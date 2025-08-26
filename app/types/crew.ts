interface MemberData {
  memberId: string;
  nickname: string;
  character: string;
}

interface Crew {
  crewId: number;
  name: string;
  leaderNickname: string;
  notice: string;
  memberCount: number;
  goal: number;
  code: string;
}

export type { MemberData, Crew };
