import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

function Index() {
  const inset = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      <WebView
        source={{ uri: process.env.EXPO_PUBLIC_WEB_URL + '/group-running' }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

export default Index;
