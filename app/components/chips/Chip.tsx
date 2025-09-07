import { Pressable, StyleProp, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Chip({ children, onPress, className, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={style}
      className={`w-auto px-3 py-[10px] rounded-full ${className}`}
    >
      {children}
    </Pressable>
  );
}
