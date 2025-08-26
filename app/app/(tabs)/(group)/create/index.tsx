import { MODULE } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Code() {
  const webviewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  const receiveMessage = (event: WebViewMessageEvent) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === MODULE.PUSH) {
      router.push(JSON.parse(data).url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        ref={webviewRef}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: ENV.WEB_VIEW_URL + '/group/create' }}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  webview: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#313131'
  }
});
