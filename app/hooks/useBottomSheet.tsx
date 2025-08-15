import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';

export interface BottomSheetConfig {
  snapPoints?: string[];
  title?: string;
  enablePanDownToClose?: boolean;
  enableBackdropPress?: boolean;
}

export const useBottomSheet = (config?: BottomSheetConfig) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const present = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const dismiss = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const close = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const snapToIndex = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const expand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const collapse = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);

  return {
    bottomSheetRef,
    present,
    dismiss,
    close,
    snapToIndex,
    expand,
    collapse,
    config: {
      snapPoints: ['40%', '60%'],
      title: '',
      enablePanDownToClose: true,
      enableBackdropPress: true,
      ...config
    }
  };
};
