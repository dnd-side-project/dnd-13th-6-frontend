'use client'
import { useRouter } from 'next/navigation'
import CrewChallengeCard from '@/components/main/CrewChallengeCard'
import { useState } from 'react';
import Image from 'next/image';


function JoinSuccess() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      <div className="text-[26px] font-bold text-[#E5E5EA] mb-4 text-left w-full">블랙핑크 뛰어<br/> 크루에 가입했어요!!</div>
          <div className="relative mt-14 mb-30 flex items-center justify-center">
              {/* 배경 이미지 */}
              <Image
                src="/assets/common/backgroundLight.svg"
                alt="배경"
                width={325}
                height={325}
                className="object-contain"
              />
              {/* 물병 이미지 */}
              <Image
                src="/assets/icon/water.svg"
                alt="물병"
                width={200}
                height={200}
                className="absolute z-10"
              />
            </div>
      <button onClick={() => router.push('/group/running?q=1')} className="w-full bg-[#32FF76] rounded-2xl">
        <div className="text-[18px] py-3 text-black font-bold">크루로 이동하기</div>
      </button>
    </div>
  )
}

export default function Page() {
  const router = useRouter();
  const [crew, setCrew] = useState<string>('');
  const [isSave, setIsSave] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);

  const onJoinCrew = () => {
    console.log('click')
    setJoinSuccess(true);
    setIsSave(true);
  }

  if(isSave) {
    return joinSuccess ? <JoinSuccess /> : <div>실패</div>
  }

  return (
    <div className="w-full">
      <div className="flex flex-col px-2 gap-4 h-[calc(100vh-90px)] relative overflow-y-auto">
             <div className="text-[26px] font-bold text-[#E5E5EA] text-left">다음 크루에 가입하시겠어요?</div>
              <CrewChallengeCard
                onClick={() => setCrew('1')}
                onTouchEnd={() => console.log('touch')}
                className={`${crew === '1' ? 'border-2 border-[#32FF76]' : ''}`}
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
              <div className="w-full flex gap-3 fixed bottom-4">
                <button onClick={onJoinCrew} className="w-full bg-[#32FF76] rounded-2xl">
                  <div className="text-[18px] py-3 text-black font-bold">가입하기</div>
                </button>
              </div> 
       </div>
    </div>
  )
}