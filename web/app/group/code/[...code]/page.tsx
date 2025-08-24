'use client'
import { useRouter } from 'next/navigation'
import CrewChallengeCard from '@/components/main/CrewChallengeCard'
import { useState } from 'react';
import Image from 'next/image';
import { MODULE } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/webView/message';


function JoinSuccess() {
  const router = useRouter();
  
  const onMove = () => {
    const data = {
      type: MODULE.PUSH,
      url: '/(tabs)/(group-running)/'
    }
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  }

  return (
    <div className="w-full flex flex-col items-center justify-center  px-2 h-[calc(100vh-90px)]">
      <div className="text-[26px] flex-grow font-bold text-[#E5E5EA]  text-left w-full">블랙핑크 뛰어<br/> 크루에 가입했어요!!</div>
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
            src="/assets/speed-up.png"
            alt="물병"
            width={265}
            height={181}
            className="absolute z-10 -rotate-z-6"
          />
        </div>
      <button onClick={onMove} className="w-full bg-[#32FF76] rounded-2xl">
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
    <div className="w-full max-h-[calc(100vh-200px)] px-2">
      <div className="text-[26px] font-bold text-[#E5E5EA] text-left">다음 크루에 가입하시겠어요?</div>
      <div className="flex flex-col relative">
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
       
       </div>
      <button disabled={crew === ''} className="w-full self-end bg-[#32FF76] disabled:opacity-20 rounded-xl mb-3 mt-5" onClick={onJoinCrew}>
        <div className="text-[18px] py-3 text-black font-bold">가입하기</div>
      </button>
    </div>
  )
}