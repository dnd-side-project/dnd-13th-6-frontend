import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Chip({ children, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      {children}
    </Pressable>
  );
}
//children크기만큼만 차지하도록
const styles = StyleSheet.create({
  container: {
    width: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 100
  }
});
