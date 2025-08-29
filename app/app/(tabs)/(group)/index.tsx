import { ENV } from '@/utils/app/consts';
import { useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { MODULE } from '@/utils/apis/api';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function RunningShare() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const webviewRef = useRef<WebView>(null);

  const receiveMessage = (event: WebViewMessageEvent) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === MODULE.AUTH) {
      AsyncStorage.setItem('accessToken', data.accessToken);
    } else if (type === MODULE.PUSH) {
      router.push(JSON.parse(data).url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: ENV.WEB_VIEW_URL + '/group' }}
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
