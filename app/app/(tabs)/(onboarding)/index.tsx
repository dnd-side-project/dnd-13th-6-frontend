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
  const receiveMessage = (event: WebViewMessageEvent) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === MODULE.AUTH) {
      if (data?.accessToken) {
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.setItem('accessToken', data.accessToken);
        try {
          router.push('/(tabs)/(home)');
        } catch (error) {
          console.error("Navigation error:", error);
          // Optionally, display an error message to the user
        }
      }
    } else if (type === MODULE.PUSH) {
      const url = JSON.parse(data).url;
      if (url === '/(tabs)/(home)') {
        // setWebViewKey(prev => prev + 1);
        router.push(url);
      }
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
        style={styles.webview}
        showsVerticalScrollIndicator={false}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: ENV.WEB_VIEW_URL + '/onboarding' }}
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
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  webview: {
    height: windowHeight,
    width: windowWidth
  }
});
