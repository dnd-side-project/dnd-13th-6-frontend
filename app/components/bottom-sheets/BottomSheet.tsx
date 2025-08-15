import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { BottomSheetConfig } from '../../hooks/useBottomSheet';

interface BottomSheetProps extends BottomSheetConfig {
  children?: React.ReactNode;
}

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      children,
      snapPoints = ['40%', '60%'],
      title,
      enablePanDownToClose = true,
      enableBackdropPress = true
    },
    ref
  ) => {
    const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior={enableBackdropPress ? 'close' : 'none'}
        />
      ),
      [enableBackdropPress]
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPointsMemo}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: '#313131' }}
        handleIndicatorStyle={{ backgroundColor: '#E5E5EA' }}
        enablePanDownToClose={enablePanDownToClose}
      >
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          {title && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: 20,
                textAlign: 'center'
              }}
            >
              {title}
            </Text>
          )}
          {children || (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>
                바텀시트 내용이 여기에 표시됩니다
              </Text>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
