'use client';

import React from 'react';
import ConfirmModal from '@/components/common/ConfirmModal';

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
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="러닝을 종료할까요?"
      closeText="취소"
      confirmText="종료하기"
    />
  );
}

export default StopConfirmModal;
