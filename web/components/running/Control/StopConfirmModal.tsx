'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface StopConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function StopConfirmModal({
  isOpen,
  onClose,
  onConfirm
}: StopConfirmModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
      <div
        className="flex flex-col items-center gap-9 rounded-[20px] bg-[#313131] px-[21px] py-9"
        style={{
          boxShadow: '0px 4px 4px 0px #00000040'
        }}
      >
        <h2 className="text-[22px] font-bold text-[#E5E5EA]">
          러닝을 종료할까요?
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex h-[54px] w-[146px] items-center justify-center rounded-[10px] bg-[#8E8E93] px-4 py-2"
          >
            <span className="text-[17px] font-bold text-[#E5E5EA]">취소</span>
          </button>
          <button
            onClick={onConfirm}
            className="flex h-[54px] w-[146px] items-center justify-center rounded-[10px] bg-[#FF383C] px-4 py-2"
          >
            <span className="text-[17px] font-bold text-[#E5E5EA]">
              종료하기
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default StopConfirmModal;
