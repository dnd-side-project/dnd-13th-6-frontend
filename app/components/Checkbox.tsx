import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
}

export default function Checkbox({ checked, onPress }: CheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.checkbox, checked ? styles.checked : styles.unchecked]}
    >
      {checked ? (
        <Ionicons name="checkmark" size={24} color="black" />
      ) : (
        <Ionicons name="checkmark" size={24} color="black" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 100,
    borderWidth: 1
  },
  unchecked: {
    backgroundColor: 'transparent',
    borderColor: '#8E8E93'
  },
  checked: {
    backgroundColor: 'red',
    borderColor: 'transparent'
  }
});
