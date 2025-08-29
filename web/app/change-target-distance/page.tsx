'use client';
import React, { useCallback, useEffect, useState } from 'react';
import DecimalInput from '@/components/common/DecimalInput';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useSetAtom } from 'jotai/index';
import { headerBackAtom, headerSaveAtom } from '@/store/header';
import { useRouter } from 'next/navigation';
import api from '@/utils/apis/customAxios';
import { GOAL_API } from '@/utils/apis/api';

function Page() {
  const router = useRouter();
  const [changedDistance, setChangedDistance] = useState('3.0');
  const [weeklyTargetDistance, setWeeklyTargetDistance] = useState('0');
  useEffect(() => {
    const weeklyGoal = localStorage.getItem('weeklyGoalDistance');
    setWeeklyTargetDistance(weeklyGoal || '0');
    setChangedDistance(weeklyGoal || '0');
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setHandleSave = useSetAtom(headerSaveAtom);
  const setHandleBack = useSetAtom(headerBackAtom);
  const changeTargetDistance = useCallback(async () => {
    try {
      await api.patch(GOAL_API.CHANGE_TARGET_DISTANCE(), {
        goal: Number(changedDistance)
      });
    } catch (error) {
      console.error(error);
    }
  }, [changedDistance]);
  const actualSave = useCallback(() => {
    changeTargetDistance();
    console.log('Saved:', changedDistance);
  }, [changedDistance, changeTargetDistance]);
  const openSaveModal = useCallback(() => {
    if (weeklyTargetDistance !== changedDistance) {
      setIsModalOpen(true);
    } else {
      router.push('/main');
    }
  }, [router, weeklyTargetDistance, changedDistance]);

  useEffect(() => {
    setHandleSave(() => openSaveModal);
    setHandleBack(() => openSaveModal);
    return () => {
      setHandleSave(undefined);
      setHandleBack(undefined);
    };
  }, [setHandleSave, openSaveModal, setHandleBack]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.back();
  };
  const handleConfirm = () => {
    actualSave();
    handleCloseModal();
  };
  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-grow flex-col">
      <div>
        <div className="mt-[10vh] flex flex-col items-center">
          <p className="headline inline-block text-xl text-white/80">
            다음주 주간 목표 거리
          </p>
          <div className="flex items-center">
            <div className="mt-10 flex items-end space-x-2">
              <DecimalInput
                className="font-lufga border-gray-60 align-center w-50 [appearance:textfield] border-b-2 bg-transparent text-center text-7xl font-extrabold text-white italic focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={changedDistance}
                onChange={setChangedDistance}
                onBlur={() => {
                  if (changedDistance !== '0') {
                    setChangedDistance(parseFloat(changedDistance).toFixed(2));
                  }
                }}
              />
              <span className="text-100 font-lufga mt-5 text-5xl font-semibold text-gray-50">
                km
              </span>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onOverlayClick={handleOverlayClick}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="변경사항을 저장할까요?"
        closeText="그냥 나가기"
        confirmText="저장하기"
        confirmBtnStyle="bg-primary text-black"
      />
    </div>
  );
}

export default Page;
