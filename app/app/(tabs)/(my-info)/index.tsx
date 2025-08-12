import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Index() {
  const inset = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      <Text>Calendar</Text>
    </View>
  );
}

export default Index;
