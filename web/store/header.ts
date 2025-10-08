import { atom } from 'jotai';

export const headerTitleAtom = atom<string | undefined>(undefined);
export const headerShowBackButtonAtom = atom<boolean>(false);
export const headerShowSaveButtonAtom = atom<boolean>(false);
export const headerSaveAtom = atom<(() => void) | undefined>(undefined);
export const headerBackAtom = atom<(() => void) | undefined>(undefined);
