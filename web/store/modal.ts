import { atom } from 'jotai';

export interface ModalState {
  isOpen: boolean;
  title: string;
  closeText?: string;
  confirmText?: string;
  confirmBtnStyle?: string;
  onConfirm: () => void;
  onClose?: () => void;
}

export const initialModalState: ModalState = {
  isOpen: false,
  title: '',
  closeText: '취소',
  confirmText: '확인',
  confirmBtnStyle: '',
  onConfirm: () => {},
  onClose: () => {},
};

export const modalAtom = atom<ModalState>(initialModalState);