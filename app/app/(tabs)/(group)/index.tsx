import AuthenticatedWebView from '@/components/AuthenticatedWebView';
import { MODULE } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function RunningShare() {
  const webviewRef = useRef<WebView>(null);
  const [webViewKey, setWebViewKey] = useState(0);
  const receiveMessage = async (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
    const { type, accessToken, data } = message;
    if (type === MODULE.AUTH) {
      if (accessToken) {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.setItem('accessToken', accessToken);
      }
    } else if (type === MODULE.PUSH) {
      const url = JSON.parse(data).url;
      if (url === '/(tabs)/(home)') {
        setWebViewKey(prev => prev + 1);
      }
      router.replace(url);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      className="flex-1 align-center justify-between py-4"
    >
      <AuthenticatedWebView
        className="flex-1 h-full bg-gray border"
        ref={webviewRef}
        key={webViewKey}
        style={styles.webview}
        showsVerticalScrollIndicator={false}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: ENV.WEB_VIEW_URL + '/group' }}
        onMessage={receiveMessage}
        bounces={false}
        overScrollMode={'never'}
        mixedContentMode="always" // HTTP 리소스 허용
      />
    </SafeAreaView>
  );
}

export default RunningShare;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight
  }
});
