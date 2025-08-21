import React from 'react';
import { Modal, View, Text, Pressable, Animated } from 'react-native';
// BlurView가 문제가 될 수 있으니 조건부로 import
import { BlurView } from 'expo-blur';

interface CustomAlertProps {
  visible: boolean;
  title?: string;
  message: string;
  buttons?: Array<{
    text: string;
    onPress?: () => void;
    className: string;
    textClassName?: string;
  }>;
  onClose: () => void;
}

export default function CustomAlert({
  visible,
  title,
  message,
  buttons,
  onClose
}: CustomAlertProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [visible]);

  const handleButtonPress = (button: any) => {
    if (button.onPress) {
      button.onPress();
    }
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onRequestClose={onClose}
    >
      {/* 오버레이 배경 - BlurView 제거하고 단순한 배경으로 */}
      <Animated.View
        className="flex-1 justify-center items-center px-8 "
        style={{
          opacity: fadeAnim,
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Alert 컨테이너 */}
        <Animated.View
          className="rounded-[20px] px-5 py-8 shadow-2xl w-full"
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
            backgroundColor: 'rgba(44, 44, 46, 0.95)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* 메시지 영역 */}
          <View className="pb-6">
            {title && (
              <Text
                className="text-lg font-bold text-center mb-4"
                style={{ color: '#32FF76' }}
              >
                {title}
              </Text>
            )}
            <Text
              className="text-[22px] font-bold text-center"
              style={{ color: '#FFFFFF' }}
            >
              {message}
            </Text>
          </View>

          {/* 버튼 영역 */}
          <View className="flex-row gap-3">
            {buttons &&
              buttons.map((button, index) => (
                <Pressable
                  key={index}
                  className={`flex-1 py-4 px-4 text-headline1 rounded-xl items-center justify-center ${button.className}`}
                  onPress={() => handleButtonPress(button)}
                >
                  <Text
                    className={`text-base font-semibold ${button.textClassName}`}
                  >
                    {button.text}
                  </Text>
                </Pressable>
              ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
