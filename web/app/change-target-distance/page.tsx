'use client';
import React, { useCallback, useEffect, useState } from 'react';
import DecimalInput from '@/components/common/DecimalInput';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useSetAtom } from 'jotai/index';
import { headerSaveAtom } from '@/store/header';

function Page() {
  const [targetDistance, setTargetDistance] = useState('3.00');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setHandleSave = useSetAtom(headerSaveAtom);
  const actualSave = useCallback(() => {
    // TODO: Add API call to save the name
    console.log('Saved:', targetDistance);
  }, [targetDistance]);
  const openSaveModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    setHandleSave(() => openSaveModal);
    return () => setHandleSave(undefined);
  }, [setHandleSave, openSaveModal]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleConfirm = () => {
    actualSave();
    handleCloseModal();
  };

  return (
    <div className="flex flex-grow flex-col">
      <div>
        <div className="mt-[10vh] flex flex-col items-center">
          <p className="headline inline-block text-xl text-white/80">
            주간 목표 거리
          </p>
          <div className="flex items-center">
            <div className="mt-10 flex items-end space-x-2">
              <DecimalInput
                className="font-lufga border-gray-60 align-center w-50 [appearance:textfield] border-b-2 bg-transparent text-center text-7xl font-extrabold text-white italic focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={targetDistance}
                onChange={setTargetDistance}
                onBlur={() => {
                  if (targetDistance !== '') {
                    setTargetDistance(parseFloat(targetDistance).toFixed(2));
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
