'use client';

import { useSetAtom } from 'jotai';
import { modalAtom, ModalState } from '@/store/modal';

type OpenModalProps = Omit<ModalState, 'isOpen'>;

export const useGlobalConfirmModal = () => {
  const setModalState = useSetAtom(modalAtom);

  const openModal = (props: OpenModalProps) => {
    setModalState({ ...props, isOpen: true });
  };

  return { openModal };
};
