import Chip from './Chip';
import { StyleProp, ViewStyle } from 'react-native';
import { Image, Text, View } from 'react-native';
interface GpsInfoChipProps {
  isGPSEnabled: 'granted' | 'waiting' | 'denied';
  style: StyleProp<ViewStyle>;
}

export default function GpsInfoChip({ isGPSEnabled, style }: GpsInfoChipProps) {
  return (
    <Chip className="bg-black/50 absolute z-[100] left-4" style={style}>
      <View className="flex flex-row items-center gap-2">
        <Image
          source={
            isGPSEnabled === 'granted'
              ? require('@/assets/images/ellipse-green.png')
              : isGPSEnabled === 'waiting'
              ? require('@/assets/images/ellipse-yellow.png')
              : require('@/assets/images/ellipse-red.png')
          }
          style={{ width: 16, height: 16 }}
        />
        <Text className="text-[14px] text-white">
          {isGPSEnabled === 'granted'
            ? 'GPS 연결됨'
            : isGPSEnabled === 'waiting'
            ? 'GPS 연결중'
            : 'GPS 연결 실패'}
        </Text>
      </View>
    </Chip>
  );
}
