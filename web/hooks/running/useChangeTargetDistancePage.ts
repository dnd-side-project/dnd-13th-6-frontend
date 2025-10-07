'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChangeTargetDistance } from '@/hooks/queries/useChangeTargetDistance';
import { useConfirmModal } from '@/hooks/ui/useConfirmModal';

export const useChangeTargetDistancePage = () => {
  const router = useRouter();
  const { openConfirm } = useConfirmModal();
  const [changedDistance, setChangedDistance] = useState('3.0');
  const [weeklyTargetDistance, setWeeklyTargetDistance] = useState('0');
  const { mutate: changeDistanceMutate } = useChangeTargetDistance();

  useEffect(() => {
    const weeklyGoal = localStorage.getItem('weeklyGoalDistance');
    setWeeklyTargetDistance(weeklyGoal || '0');
    setChangedDistance(weeklyGoal || '0');
  }, []);

  const handleSaveChanges = useCallback(() => {
    changeDistanceMutate(Number(changedDistance));
    router.back();
  }, [changedDistance, changeDistanceMutate, router]);

  const handleBack = useCallback(() => {
    if (weeklyTargetDistance !== changedDistance) {
      openConfirm({
        title: '변경사항을 저장할까요?',
        closeText: '그냥 나가기',
        confirmText: '저장하기',
        confirmBtnStyle: 'bg-primary text-black',
        onConfirm: handleSaveChanges,
        onClose: () => router.push('/main') // 그냥 나갈 때도 뒤로가기
      });
    } else {
      router.push('/main');
    }
  }, [
    router,
    weeklyTargetDistance,
    changedDistance,
    openConfirm,
    handleSaveChanges
  ]);

  const handleSaveClick = useCallback(() => {
    handleSaveChanges();
    router.push('/main');
  }, [handleSaveChanges, router]);

  return {
    changedDistance,
    setChangedDistance,
    handleSaveClick,
    handleBack
  };
};
