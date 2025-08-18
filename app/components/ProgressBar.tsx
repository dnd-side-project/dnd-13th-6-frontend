import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  LayoutChangeEvent
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import SpeechBubble from './ui/SpeechBallon';

interface ProgressBarProps {
  progress: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  animated?: boolean;
  duration?: number;
  style?: ViewStyle;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  width: propWidth, // 외부에서 고정 폭을 줄 수도 있게 유지
  animated = true,
  duration = 1000,
  style,
  showPercentage = true
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
  const [layoutWidth, setLayoutWidth] = useState<number | null>(null);

  // 실제 사용할 바 폭(픽셀): 레이아웃 측정값 > propWidth > 화면기준 여백
  const effectiveWidth =
    layoutWidth ??
    (typeof propWidth === 'number' ? propWidth : Math.max(windowWidth - 60, 0));

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedProgress, {
        toValue: Math.max(0, Math.min(progress, 100)),
        duration,
        useNativeDriver: false
      }).start();
    } else {
      animatedProgress.setValue(Math.max(0, Math.min(progress, 100)));
    }
  }, [progress, animated, duration]);

  const progressWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [0, effectiveWidth || 0],
    extrapolate: 'clamp'
  });

  // 퍼센트 말풍선 위치(컨테이너 내부로 클램핑)
  const bubblePosition =
    ((effectiveWidth || 0) * Math.max(0, Math.min(progress, 100))) / 100;
  const clampedPosition = effectiveWidth
    ? Math.max(26, Math.min(bubblePosition, effectiveWidth - 26))
    : 26;

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w && w !== layoutWidth) setLayoutWidth(w);
  };

  return (
    <View
      onLayout={onLayout}
      // 부모가 주는 폭을 우선: propWidth가 있으면 그 폭, 없으면 100%
      style={[
        { width: typeof propWidth === 'number' ? propWidth : '100%' },
        styles.container,
        style
      ]}
    >
      {/* ProgressBar */}
      <View
        className="bg-black h-3"
        style={[
          styles.progressBackground,
          {
            width: '100%',
            marginTop: showPercentage ? 8 : 0
          }
        ]}
      >
        <Animated.View
          className="bg-main"
          style={[
            styles.progressBar,
            {
              width: progressWidth
            }
          ]}
        />
      </View>

      {/* SpeechBubble */}
      {showPercentage && progress > 0 && effectiveWidth > 0 && (
        <View
          style={[styles.speechBubbleContainer, { left: clampedPosition - 26 }]}
        >
          <SpeechBubble
            position="bottom"
            className="bg-black rounded-md w-[52px] h-[32px] flex items-center justify-center"
          >
            <Text className="text-main font-[600] text-[15px]">
              {Math.round(Math.max(0, Math.min(progress, 100)))}%
            </Text>
          </SpeechBubble>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 33,
    zIndex: 10
  },
  progressBackground: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 18
  }
});

export default ProgressBar;
