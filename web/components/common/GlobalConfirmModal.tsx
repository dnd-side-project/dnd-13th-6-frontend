'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { initialModalState, modalAtom } from '@/store/modal';
import ConfirmModal from './ConfirmModal';

export function GlobalConfirmModal() {
  const modalState = useAtomValue(modalAtom);
  const {
    isOpen,
    title,
    closeText,
    confirmText,
    confirmBtnStyle,
    onConfirm,
    onClose
  } = modalState;

  const closeModal = useSetAtom(modalAtom);

  const handleConfirm = () => {
    onConfirm?.();
    closeModal(initialModalState);
  };

  const handleClose = () => {
    onClose?.();
    closeModal(initialModalState);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      onOverlayClick={() => closeModal(initialModalState)}
      title={title}
      closeText={closeText}
      confirmText={confirmText}
      confirmBtnStyle={confirmBtnStyle}
    />
  );
}
