import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

interface ProgressBarProps {
  progress: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  animated?: boolean;
  duration?: number;
  style?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  width = 360,
  height = 30,
  backgroundColor = '#E0E0E0',
  progressColor = '#666666',
  animated = true,
  duration = 1000,
  style
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
    outputRange: [0, width], // padding 고려
    extrapolate: 'clamp'
  });

  return (
    <View style={style}>
      <View
        style={[
          styles.progressBackground,
          {
            width,
            height,
            backgroundColor
          }
        ]}
      >
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressWidth,
              backgroundColor: progressColor
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBackground: {
    borderRadius: 20,
    overflow: 'hidden',
    paddingBlock: 4,
    paddingInline: 8
  },
  progressBar: {
    height: '100%',
    borderRadius: 18,
    margin: 1
  }
});

export default ProgressBar;
