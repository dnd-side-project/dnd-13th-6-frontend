import { Pressable } from 'react-native';

interface Props {
  className?: string;
  onPress: () => void | Promise<void>;
  children: React.ReactNode;
  disabled?: boolean;
}

function Button({ className, onPress, children, disabled }: Props) {
  return (
    <Pressable className={`${className}`} onPress={onPress} disabled={disabled}>
      {children}
    </Pressable>
  );
}

export default Button;
