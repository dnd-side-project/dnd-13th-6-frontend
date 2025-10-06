'use client';
import React from 'react';
import DecimalInput from '@/components/common/DecimalInput';
import { useChangeTargetDistancePage } from '@/hooks/useChangeTargetDistancePage';
import { useHeaderControls } from '@/hooks/useHeaderControls';

function Page() {
  const { changedDistance, setChangedDistance, handleSaveClick, handleBack } =
    useChangeTargetDistancePage();

  useHeaderControls({
    title: '목표 거리 변경',
    showBackButton: true,
    showSaveButton: true,
    onSave: handleSaveClick,
    onBack: handleBack
  });

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
    </div>
  );
}

export default Page;
