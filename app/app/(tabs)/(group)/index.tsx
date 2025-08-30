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
      console.log('url', url);
      if (url === '/(tabs)/(home)') {
        setWebViewKey(prev => prev + 1);
      }
      router.push(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        key={webViewKey}
        style={styles.webview}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: ENV.WEB_VIEW_URL + '/group/running' }}
        onMessage={receiveMessage}
      />
    </SafeAreaView>
  );
}

export default RunningShare;

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
