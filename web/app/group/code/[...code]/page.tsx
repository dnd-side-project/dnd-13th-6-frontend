'use client';
import { useRouter } from 'next/navigation';
import CrewChallengeCard, {
  CrewChallengeCardProps
} from '@/components/main/CrewChallengeCard';
import { useState } from 'react';
import Image from 'next/image';
import { MODULE } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';

function JoinSuccess() {
  const router = useRouter();

  const onMove = () => {
    const data = {
      type: MODULE.PUSH,
      url: '/(tabs)/(group-running)/'
    };
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  };

  return (
    <div className="flex h-[calc(100vh-90px)] w-full flex-col items-center justify-center px-2">
      <div className="w-full flex-grow text-left text-[26px] font-bold text-[#E5E5EA]">
        블랙핑크 뛰어
        <br /> 크루에 가입했어요!!
      </div>
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
      <button onClick={onMove} className="w-full rounded-2xl bg-[#32FF76]">
        <div className="py-3 text-[18px] font-bold text-black">
          크루로 이동하기
        </div>
      </button>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [crew, setCrew] = useState<string>('');
  const [isSave, setIsSave] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);

  const onJoinCrew = () => {
    console.log('click');
    setJoinSuccess(true);
    setIsSave(true);
  };

  if (isSave) {
    return joinSuccess ? <JoinSuccess /> : <div>실패</div>;
  }

  return (
    <div className="max-h-[calc(100vh-200px)] w-full px-2">
      <div className="text-left text-[26px] font-bold text-[#E5E5EA]">
        다음 크루에 가입하시겠어요?
      </div>
      <div className="relative flex flex-col">
        <CrewChallengeCard
          onClick={() => setCrew('1')}
          onTouchEnd={() => console.log('touch')}
          className={`${crew === '1' ? 'border-2 border-[#32FF76]' : ''}`}
          title="이번 주 크루 챌린지"
          // distance={42}
          progress={0.7}
          id="1"
          goal={100}
          runningDistance={100}
          isRunning={true}
          members={['A', 'B', 'C', 'D', 'E']}
        />
      </div>
      <button
        disabled={crew === ''}
        className="mt-5 mb-3 w-full self-end rounded-xl bg-[#32FF76] disabled:opacity-20"
        onClick={onJoinCrew}
      >
        <div className="py-3 text-[18px] font-bold text-black">가입하기</div>
      </button>
    </div>
  );
}
