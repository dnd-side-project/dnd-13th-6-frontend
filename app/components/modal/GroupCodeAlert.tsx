import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  Pressable,
  Animated,
  Clipboard
} from 'react-native';

interface GroupCodeAlertProps {
  visible: boolean;
  onClose: () => void;
  code: string;
}

export default function GroupCodeAlert({
  visible,
  onClose,
  code
}: GroupCodeAlertProps) {
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
        className="flex-1 justify-center items-center px-8"
        style={{
          opacity: fadeAnim,
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Alert 컨테이너 */}
        <Animated.View
          className="rounded-[20px] px-5 py-8 shadow-2xl w-full  flex gap-6"
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
            backgroundColor: 'rgba(44, 44, 46, 0.95)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <View className="flex flex-row justify-between items-center">
            <Text className="text-title3 text-gray20">초대 코드</Text>
            <Pressable
              onPress={() => {
                Clipboard.setString(code);
              }}
            >
              <Image
                source={require('@/assets/images/copy.png')}
                style={{ width: 18, height: 18 }}
              />
            </Pressable>
          </View>
          <View className="flex flex-row gap-1 justify-center">
            {code.split('').map((item, index) => {
              return (
                <View
                  key={`groupCode-${index}`}
                  className="rounded-lg px-[15px] py-[14px] bg-gray90 flex-1"
                >
                  <Text className="text-center text-gray20 text-2xl font-semibold">
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <Pressable
            onPress={onClose}
            className="bg-gray70 rounded-lg px-[15px] py-[14px]"
          >
            <Text className="text-center text-gray20">닫기</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
