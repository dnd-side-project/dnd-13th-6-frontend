import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, ViewStyle } from 'react-native';
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
  width = 360,
  height = 30,
  animated = true,
  duration = 1000,
  style,
  showPercentage = true
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedProgress, {
        toValue: progress,
        duration,
        useNativeDriver: false
      }).start();
    } else {
      animatedProgress.setValue(progress);
    }
  }, [progress, animated, duration]);

  const progressWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [0, width],
    extrapolate: 'clamp'
  });

  // 퍼센트 위치 계산 (진행률에 따른 SpeechBubble 위치)
  const bubblePosition = (width * progress) / 100;
  // 최소/최대 위치 제한 (SpeechBubble이 화면 밖으로 나가지 않도록)
  const clampedPosition = Math.max(26, Math.min(bubblePosition, width - 26));

  return (
    <View style={[styles.container, style]}>
      {/* ProgressBar */}
      <View
        className="bg-black h-3"
        style={[
          styles.progressBackground,
          {
            width,
            marginTop: showPercentage ? 8 : 0 // SpeechBubble 공간 확보
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
      {/* SpeechBubble - ProgressBar 위에 위치 */}
      {showPercentage && progress > 0 && (
        <View
          style={[
            styles.speechBubbleContainer,
            { left: clampedPosition - 26 } // SpeechBubble 중앙 정렬
          ]}
        >
          <SpeechBubble
            position="bottom"
            className="bg-black rounded-md w-[52px] h-[32px] flex items-center justify-center"
          >
            <Text className="text-main font-[600] text-[15px]">
              {Math.round(progress)}%
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
