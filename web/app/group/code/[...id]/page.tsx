'use client';
import CrewChallengeCard from '@/components/main/CrewChallengeCard';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { API_END_POINT, MODULE } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import BackgroundLight from '@/public/assets/common/backgroundLight.svg';
import { useParams } from 'next/navigation';
import { Crew, MemberData } from '@/types/crew';
import api from '@/utils/apis/customAxios';
import { useAuthToken } from '@/hooks/user/useAuthToken';
function JoinSuccess({crewInfo}: {crewInfo: Crew}) {
  const onMove = () => {
    if(!crewInfo) return;
    postMessageToApp(
      MODULE.PUSH,
      JSON.stringify({
        url: `/(tabs)/(group)/running/${crewInfo.crewId}`
      })
    );
  };


  if(!crewInfo) return <p>Loading...</p>


  return (
    <div className="flex h-[calc(100vh-90px)] w-full flex-col items-center justify-center px-2">
      <div className="w-full flex-grow text-left text-[26px] font-bold text-[#E5E5EA]">
        {crewInfo.name}
        <br /> 크루에 가입했어요!!
      </div>
      <div className="relative mt-14 mb-30 flex items-center justify-center">
        {/* 배경 이미지 */}
        <BackgroundLight width={325} height={325} className="object-contain" />
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
  const params = useParams();
  const [crew, setCrew] = useState<string>('');
  const [crewMembers, setCrewMembers] = useState<Array<string>>([]);
  const [isSave, setIsSave] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [crewInfo, setCrewInfo] = useState<Crew>();
  const onJoinCrew = () => {
    setJoinSuccess(true);
    setIsSave(true);
  };
  useAuthToken();

  useEffect(() => {
    const init = async() => {
      const crewId = parseInt(params.id![0]);
      const { data} = await api.get(API_END_POINT.CREWS.GET_CREW_DETAIL(crewId))
      const {data:memberData} = await api.get(API_END_POINT.CREWS.GET_MEMBERS(crewId));
      setCrewInfo(data.result);
      setCrewMembers(memberData.result.members.map((member: MemberData) => member.badgeImageUrl));
    }
    
    init();
  },[])

  if(!crewInfo || !crewMembers) return <div>Loading...</div>

  if (isSave) {
    return joinSuccess ? <JoinSuccess crewInfo={crewInfo} /> : <div>실패</div>;
  }
  

  return (
    <div className="max-h-[calc(100vh-200px)] w-full px-2">
      <div className="text-left text-[26px] font-bold text-[#E5E5EA]">
        다음 크루에 가입하시겠어요?
      </div>
      <div className="relative flex flex-col">
        <CrewChallengeCard
          onClick={() => setCrew(crewInfo.crewId)}
          onTouchEnd={() => setCrew(crewInfo.crewId)}
          className={`${crew === crewInfo.crewId ? 'border-2 border-[#32FF76]' : ''}`}
          title={crewInfo.name}
          progress={0.7}
          id={crewInfo.crewId}
          goal={crewInfo.goal}
          runningDistance={crewInfo.runningDistance}
          isRunning={false}
          members={crewMembers}
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
