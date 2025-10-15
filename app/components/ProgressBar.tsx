import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import SpeechBubble from './ui/SpeechBallon';

interface ProgressBarProps {
  progress: number;
  width: number;
  animated?: boolean;
  duration?: number;
  style?: ViewStyle;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  width: propWidth,
  animated = true,
  duration = 1000,
  style,
  showPercentage = true
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

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
    outputRange: [0, propWidth],
    extrapolate: 'clamp'
  });

  return (
    <View style={[{ width: propWidth }, styles.container, style]}>
      {/* Progress bar */}
      <View className="bg-black h-3 mx-auto" style={[styles.progressBackground]}>
        <Animated.View
          className="bg-main"
          style={[styles.progressBar, { width: progressWidth }]}
        />
      </View>

      {/* Tooltip */}
      {showPercentage && propWidth > 0 && (
        <Animated.View
          className="mt-5"
          style={{
            transform: [
              {
                translateX: animatedProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, propWidth - 52], // 52 = SpeechBubble 전체 너비
                  extrapolate: 'clamp'
                })
              }
            ]
          }}
        >
          <SpeechBubble
            position="bottom"
            className="bg-black rounded-md w-[52px] h-[32px] flex items-center justify-center"
          >
            <Text className="text-main font-[600] text-[15px]">
              {Math.round(Math.max(0, Math.min(progress, 100)))}%
            </Text>
          </SpeechBubble>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
  },
  progressBackground: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%'
  },
  progressBar: {
    height: '100%',
    borderRadius: 18
  }
});

export default ProgressBar;
