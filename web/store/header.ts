import { atom } from 'jotai';

export const headerSaveAtom = atom<(() => void) | undefined>(undefined);