import AuthenticatedWebView from '@/components/AuthenticatedWebView';
import { MODULE } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

function Index() {
  const webviewRef = useRef<WebView>(null);

  const handleMessage = async (event: WebViewMessageEvent) => {
    try {
      const { type, accessToken } = JSON.parse(event.nativeEvent.data);
      if (type === MODULE.AUTH && accessToken) {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.setItem('accessToken', accessToken);
      }
    } catch (error) {
      console.error('WebView로부터 받은 메시지 처리 중 오류 발생:', error);
    }
  };

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
        onMessage={handleMessage}
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
