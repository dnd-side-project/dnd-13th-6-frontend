'use client';
import { useRouter } from 'next/navigation';
import CrewChallengeCard from '@/components/main/CrewChallengeCard';
import { postMessageToApp } from '@/utils/webView/message';
import { MODULE } from '@/utils/apis/api';
export default function Page() {
  const router = useRouter();

  const onMove = () => {
    const data = {
      type: MODULE.PUSH,
      url: '/(tabs)/(group)/code'
    }
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  }
  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col">
      <div className="flex flex-grow flex-col gap-4 overflow-y-scroll px-2">
        <CrewChallengeCard
          title="이번 주 크루 챌린지"
          distance={42}
          progress={0.7}
          members={['A', 'B', 'C', 'D', 'E']}
        />
        <CrewChallengeCard
          title="이번 주 크루 챌린지"
          distance={42}
          progress={0.7}
          members={['A', 'B', 'C', 'D', 'E']}
        />
        <CrewChallengeCard
          title="이번 주 크루 챌린지"
          distance={42}
          progress={0.7}
          members={['A', 'B', 'C', 'D', 'E']}
        />
        <CrewChallengeCard
          title="이번 주 크루 챌린지"
          distance={42}
          progress={0.7}
          members={['A', 'B', 'C', 'D', 'E']}
        />
        <CrewChallengeCard
          title="이번 주 크루 챌린지"
          distance={42}
          progress={0.7}
          members={['A', 'B', 'C', 'D', 'E']}
        />
      </div>
      <div className="flex gap-3 bg-none">
        <button
          className="flex-1 rounded-2xl bg-[#48484A]"
          onClick={() => alert('결과보기')}
        >
          <div className="py-3 text-[17px] font-bold">크루 만들기</div>
        </button>
        <button
          className="flex-1 rounded-2xl bg-[#32FF76]"
          onClick={onMove}
        >
          <div className="py-3 text-[18px] font-bold text-black">
            초대 코드 입력
          </div>
        </button>
      </div>
    </div>
  );
}
