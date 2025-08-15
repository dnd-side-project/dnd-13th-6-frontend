import { View, StyleSheet } from 'react-native';

export default function BottomSheet({
  children
}: {
  children: React.ReactNode;
}) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 28,
    paddingTop: 46,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#313131'
  }
});
