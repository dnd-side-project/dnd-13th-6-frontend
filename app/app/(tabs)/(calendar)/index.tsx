import { useRef } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function Index() {
  const inset = useSafeAreaInsets();
  const webviewRef = useRef<WebView>(null);
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        source={{ uri: 'https://web.runky.store' + '/calendar' }}
          mixedContentMode="always" // HTTP 리소스 허용
      />
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1,
    backgroundColor: '#333333'
  }
});
