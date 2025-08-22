import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { forwardRef, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheetConfig } from '../../hooks/useBottomSheet';
interface BottomSheetProps extends BottomSheetConfig {
  children?: React.ReactNode;
  onBackdropPress?: () => void;
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
      (props: BottomSheetBackdropProps) => (
        <Pressable
          onPress={() => {
            if (typeof ref === 'function') {
              return;
            }
            ref?.current?.close();
          }}
          style={[props.style, { flex: 1 }]}
        >
          {/* Blur 효과 */}
          <BlurView
            style={{ flex: 1 }}
            intensity={0} // 블러 강도
            tint="dark" // 'light', 'dark', 'default'
          />
          {/* 살짝 어두운 오버레이 */}
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.3)' // 투명도 조절
            }}
          />
        </Pressable>
      ),
      []
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

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)'
  }
});
