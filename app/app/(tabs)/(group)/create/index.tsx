import { MODULE } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useWebViewReset } from '../../_layout';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Code() {
  const webviewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { resetTrigger } = useWebViewReset();
  const initialUrl = ENV.WEB_VIEW_URL + '/group/create';

  const receiveMessage = (event: WebViewMessageEvent) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === MODULE.AUTH) {
      if (data?.accessToken) {
        AsyncStorage.setItem('accessToken', data.accessToken);
      }
    } else if (type === MODULE.PUSH) {
      router.push(JSON.parse(data).url);
    }
  };

  // 탭 전환 시 WebView URI 초기화
  useEffect(() => {
    if (resetTrigger > 0 && webviewRef.current) {
      const script = `window.location.href = '${initialUrl}'; true;`;
      webviewRef.current.injectJavaScript(script);
    }
  }, [resetTrigger]);

  return (
    <SafeAreaView className="flex-1 justify-between items-center">
      <WebView
        className="flex-1 bg-gray"
        style={styles.webview}
        ref={webviewRef}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: initialUrl }}
        onLoadEnd={() => setIsLoading(false)}
        onLoadStart={() => setIsLoading(true)}
        scrollEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsLinkPreview={false}
        onMessage={receiveMessage}
        allowsBackForwardNavigationGestures={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webview: {
    height: windowHeight,
    width: windowWidth
  }
});
