import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  position?: 'bottom' | 'top';
  variant?: 'warning';
  showTail?: boolean;
  animate?: boolean;
  absolute?: boolean;
  className?: string;
}

export default function SpeechBubble({
  children,
  position = 'top',
  className,
  showTail = true
}: Props) {
  return (
    <View className='relative'>
      <View className={className}>
        {/* 말풍선 내용 */}
        {children}
      </View>

      {/* 말풍선 꼬리 (아래쪽 화살표) - position이 top일 때 */}
      {showTail && position === 'top' && (
        <View style={styles.tailContainer}>
          <View style={styles.tailDown} />
        </View>
      )}

      {/* 말풍선 꼬리 (위쪽 화살표) - position이 bottom일 때 */}
      {showTail && position === 'bottom' && (
        <View style={styles.tailContainerUp}>
          <View style={styles.tailUp} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tailContainer: {
    position: 'absolute',
    bottom: -8, // 말풍선 아래에 정확히 붙도록
    left: '0%', // 중앙 위치
    transform: [{ translateX: -6 }], // 꼬리 너비의 절반만큼 이동 (정확한 중앙)
    zIndex: 1
  },
  tailContainerUp: {
    position: 'absolute',
    top: -8, // 말풍선 위에 정확히 붙도록
    left: 25, // 중앙 위치
    transform: [{ translateX: -6 }], // 꼬리 너비의 절반만큼 이동
    zIndex: 1
  },
  tailDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#000' // 말풍선과 같은 색상
  },
  tailUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000'
  }
});
