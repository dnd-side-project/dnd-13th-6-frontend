import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef } from 'react';
import WebView from 'react-native-webview';
import { ENV } from '@/utils/app/consts';
import { StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function Index() {
  const inset = useSafeAreaInsets();
  const webviewRef = useRef<WebView>(null);
  return (
    <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: ENV.WEB_VIEW_URL + '/calendar' }}
      />
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  webview: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#313131'
  }
});
