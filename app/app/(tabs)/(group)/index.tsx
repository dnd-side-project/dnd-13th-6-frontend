import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

function Index() {
  const inset = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      <WebView source={{ uri: 'http://localhost:3000' }} />
    </View>
  );
}

export default Index;
