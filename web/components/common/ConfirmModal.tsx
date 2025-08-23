'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  closeText: string;
  confirmText: string;
  confirmBtnStyle?: string;
}

function ConfirmModal({
  isOpen,
  onClose,
  title,
  closeText = '취소',
  confirmText,
  confirmBtnStyle = 'bg-[#FF002E]',
  onConfirm
}: ConfirmModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className="flex flex-col items-center gap-9 rounded-[20px] bg-[#313131] px-[21px] py-9"
        style={{
          boxShadow: '0px 4px 4px 0px #00000040'
        }}
      >
        <h2 className="text-gray-20 text-[22px] font-bold">{title}</h2>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex h-[54px] w-[146px] items-center justify-center rounded-[10px] bg-[#8E8E93] px-4 py-2"
          >
            <span className="text-gray-20 text-[17px] font-bold">
              {closeText}
            </span>
          </button>
          <button
            onClick={onConfirm}
            className={twMerge(
              `text-gray-20 flex h-[54px] w-[146px] items-center justify-center rounded-[10px] px-4 py-2 text-[17px] font-bold`,
              confirmBtnStyle
            )}
          >
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmModal;
