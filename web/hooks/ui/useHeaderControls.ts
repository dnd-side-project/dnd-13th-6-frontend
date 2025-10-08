'use client';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import {
  headerBackAtom,
  headerSaveAtom,
  headerShowBackButtonAtom,
  headerShowSaveButtonAtom,
  headerTitleAtom,
} from '@/store/header';

interface HeaderControlsProps {
  title?: string;
  showBackButton?: boolean;
  showSaveButton?: boolean;
  onSave?: () => void;
  onBack?: () => void;
}

export const useHeaderControls = ({
  title,
  showBackButton,
  showSaveButton,
  onSave,
  onBack,
}: HeaderControlsProps) => {
  const setTitle = useSetAtom(headerTitleAtom);
  const setShowBackButton = useSetAtom(headerShowBackButtonAtom);
  const setShowSaveButton = useSetAtom(headerShowSaveButtonAtom);
  const setHandleSave = useSetAtom(headerSaveAtom);
  const setHandleBack = useSetAtom(headerBackAtom);

  useEffect(() => {
    setTitle(title);
    setShowBackButton(!!showBackButton);
    setShowSaveButton(!!showSaveButton);
    setHandleSave(() => onSave);
    setHandleBack(() => onBack);

    return () => {
      setTitle(undefined);
      setShowBackButton(false);
      setShowSaveButton(false);
      setHandleSave(undefined);
      setHandleBack(undefined);
    };
  }, [
    title,
    showBackButton,
    showSaveButton,
    onSave,
    onBack,
    setTitle,
    setShowBackButton,
    setShowSaveButton,
    setHandleSave,
    setHandleBack,
  ]);
};
