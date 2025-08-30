import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { ENV } from '@/utils/app/consts';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { MODULE } from '@/utils/apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWebViewReset } from '../_layout';
import { useEffect, useRef } from 'react';
import { router } from 'expo-router';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Index() {
  const webViewRef = useRef<WebView>(null);
  const { resetTrigger } = useWebViewReset();
  const initialUrl = `${ENV.WEB_VIEW_URL}/main`;

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('data', data);
    if (data.type === MODULE.AUTH) {
      if (data?.accessToken) {
        AsyncStorage.setItem('accessToken', data.accessToken);
      }
    } else if (data.type === MODULE.PUSH) {
      const { type, url } = JSON.parse(data.data);
      router.push(url);
    }
    if (data.nickName) {
      AsyncStorage.setItem('nickName', data.nickName);
    }
    if (data.userId) {
      AsyncStorage.setItem('userId', data.userId);
    }
  };

  // 탭 전환 시 WebView URI 초기화
  useEffect(() => {
    if (resetTrigger > 0 && webViewRef.current) {
      const script = `window.location.href = '${initialUrl}'; true;`;
      webViewRef.current.injectJavaScript(script);
    }
  }, [resetTrigger]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{ uri: initialUrl }}
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
  },
  runningButton: {
    backgroundColor: 'gray',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  runningButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
