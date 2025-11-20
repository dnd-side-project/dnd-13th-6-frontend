import AuthenticatedWebView from '@/components/AuthenticatedWebView';
import { ENV } from '@/utils/app/consts';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
function Index() {
  const webviewRef = useRef<WebView>(null);
  return (
    <SafeAreaView style={styles.container}>
      <AuthenticatedWebView
        ref={webviewRef}
        style={styles.webview}
        source={{ uri: ENV.WEB_VIEW_URL + '/calendar' }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode={'never'}
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
