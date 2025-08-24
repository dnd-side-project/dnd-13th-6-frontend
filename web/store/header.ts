import { atom } from 'jotai';

export const headerSaveAtom = atom<(() => void) | undefined>(undefined);
export const headerBackAtom = atom<(() => void) | undefined>(undefined);
