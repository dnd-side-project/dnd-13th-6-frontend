'use client'
import { useRouter } from 'next/navigation'
import CrewChallengeCard from '@/components/main/CrewChallengeCard'

export default function Page() {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex flex-col px-2 gap-4 h-[calc(100vh-90px)] relative overflow-y-auto">
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
      <div className="w-full flex gap-3 fixed bottom-4">
        <button className="w-full bg-[#48484A] rounded-2xl" onClick={() => alert('결과보기')}>
          <div className="text-[17px] py-3 font-bold">크루 만들기</div>
        </button>
        <button className="w-full bg-[#32FF76] rounded-2xl" onClick={() => router.push('/group/code')}>
          <div className="text-[18px] py-3 text-black font-bold">초대 코드 입력</div>
        </button>
      </div>
    </div>
  )
}