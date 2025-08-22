import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
}

export default function Checkbox({ checked, onPress }: CheckboxProps) {
  return (
    <Pressable onPress={onPress} style={[styles.checkbox]}>
      <Ionicons name="ellipse" size={12} color={checked ? '#31FF76' : 'none'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 100,
    borderWidth: 3,
    width: 20,
    height: 20,
    borderColor: '#8E8E93',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
