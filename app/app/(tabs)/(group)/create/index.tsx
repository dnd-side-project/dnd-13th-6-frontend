import { MODULE } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Code() {
  const webviewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
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
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsLinkPreview={false}
        onMessage={receiveMessage}
        allowsBackForwardNavigationGestures={true}
        bounces={false}
        overScrollMode={'never'}
           mixedContentMode="always" // HTTP 리소스 허용
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
