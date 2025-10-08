'use client';

import { useSetAtom } from 'jotai';
import { modalAtom, ModalState } from '@/store/modal';

type OpenConfirmProps = Omit<Partial<ModalState>, 'isOpen'> & {
  onConfirm: () => void;
};

export const useConfirmModal = () => {
  const setModal = useSetAtom(modalAtom);

  const openConfirm = (props: OpenConfirmProps) => {
    setModal({
      isOpen: true,
      title: props.title || '',
      closeText: props.closeText,
      confirmText: props.confirmText,
      confirmBtnStyle: props.confirmBtnStyle,
      onConfirm: props.onConfirm,
      onClose: props.onClose
    });
  };

  return { openConfirm };
};
