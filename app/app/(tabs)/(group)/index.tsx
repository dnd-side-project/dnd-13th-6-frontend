import { ENV } from '@/utils/app/consts';
import { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { MODULE } from '@/utils/apis/api';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function RunningShare() {
  const webviewRef = useRef<WebView>(null);
  const [webViewKey, setWebViewKey] = useState(0);
  const receiveMessage = (event: WebViewMessageEvent) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    console.log('type', data);
    if (type === MODULE.AUTH) {
      if (data?.accessToken) {
        AsyncStorage.setItem('accessToken', data.accessToken);
      }
    } else if (type === MODULE.PUSH) {
      const url = JSON.parse(data).url;
      if (url === '/(tabs)/(home)') {
        setWebViewKey(prev => prev + 1);
      }
      router.push(url);
    }
  };

  return (
    <SafeAreaView className="flex-1 align-center justify-between py-4">
      <WebView
        ref={webviewRef}
        key={webViewKey}
        style={styles.webview}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: ENV.WEB_VIEW_URL + '/group' }}
        onMessage={receiveMessage}
      />
    </SafeAreaView>
  );
}

export default RunningShare;

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#313131'
  }
});
