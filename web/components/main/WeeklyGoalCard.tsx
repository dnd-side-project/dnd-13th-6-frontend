'use client';
import Card from '@/components/main/Card';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { MODULE } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { useQuery } from '@tanstack/react-query';
import { getGoalDistance } from '@/utils/queries/goal';
import { getWeeklyRunDistance } from '@/utils/queries/running';
import { queryKeys } from '@/utils/queries/queryKeys';
export default function WeeklyGoalCard() {
  const { data: goalDistance } = useQuery({
    queryKey: queryKeys.goal.goalDistance(),
    queryFn: getGoalDistance
  });

  const { data: weeklyRunDistance } = useQuery({
    queryKey: queryKeys.running.weekly(),
    queryFn: getWeeklyRunDistance
  });

  const remainingDistance = goalDistance - weeklyRunDistance;
  const router = useRouter();

  const onMove = () => {
    const data = {
      type: MODULE.PUSH,
      url: '/(tabs)/(single-running)'
    };
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  };
  return (
    <Card
      className="relative mt-[24px] py-[28px]"
      onClick={() => router.push('/change-target-distance')}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="tex-[1.0625rem] text-gray-20 leading-[150%] font-bold tracking-tight">
            이번주 목표
          </p>
          <div className="flex items-center">
            <p className="text-primary font-lufga text-[2.0625rem] leading-[1.4] font-bold tracking-[0] italic">
              {goalDistance}km
            </p>
            <p className="text-gray-20 ml-2 text-[1.5rem] leading-[1.4] font-bold tracking-[-0.025em]">
              달리기
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[14px] flex items-center justify-between">
        <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
          현재까지 달린 거리
        </p>
        <p className="font-lufga itailic text-gray-20 text-[1.1875rem] leading-[1.4] font-medium tracking-[-0.025em] italic">
          {weeklyRunDistance}km
        </p>
      </div>
      <div className="mt-[8px] flex items-center justify-between">
        <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
          목표까지 남은 거리
        </p>
        <p className="font-lufga text-gray-20 text-[1.1875rem] leading-[1.4] font-medium tracking-[-0.025em] italic">
          {remainingDistance}km
        </p>
      </div>
      <Button
        className="mt-5 h-12 w-full text-[0.9375rem] leading-[1.5] font-bold tracking-[-0.025em] text-black"
        onClickAction={onMove}
      >
        시작하기
      </Button>
    </Card>
  );
}
