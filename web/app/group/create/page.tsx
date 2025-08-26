'use client';
import { useState } from 'react';
import { CrewApi } from '@/utils/apis/crewApi';
import { useRouter } from 'next/navigation';
import { postMessageToApp } from '@/utils/webView/message';
import { MODULE } from '@/utils/apis/api';
export default function Page() {
  const router = useRouter();
  const [crewName, setCrewName] = useState('');

  const onMove = (url: string) => {
    const data = {
      type: MODULE.PUSH,
      url: url
    };
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await CrewApi.createCrew(crewName);
      onMove('/(tabs)/(group)');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 flex h-[calc(100vh-90px)] w-full flex-col px-4"
    >
      <div className="pretendard-title1 text-gray20 w-full">
        크루 정보를 입력해주세요.
      </div>
      <div className="mt-8 flex-grow">
        <div className="pretendard-headline1">크루명</div>
        <input
          type="text"
          value={crewName}
          onChange={e => setCrewName(e.target.value)}
          placeholder="우리 크루, 이번 주도 완주 GO!"
          className="bg-gray-90 text-gray20 mt-5 mb-3 w-full rounded-2xl px-5 py-4"
        />
        <div className="pretendard-body3 text-gray-40 text-right">
          <span className={`${crewName.length > 10 ? 'text-red' : null}`}>
            {crewName.length}
          </span>
          /10
        </div>
      </div>
      <button
        type="submit"
        disabled={crewName.length < 1 || crewName.length > 10}
        className="bg-primary title-5 justify-self-end rounded-2xl py-[18px] text-center text-black disabled:opacity-20"
      >
        크루 만들기
      </button>
    </form>
  );
}
