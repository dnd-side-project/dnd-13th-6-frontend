import { SafeAreaView } from 'react-native';
import { ENV } from '@/utils/app/consts';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { MODULE } from '@/utils/apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef } from 'react';
import { router } from 'expo-router';

function Index() {
  const webViewRef = useRef<WebView>(null);
  const initialUrl = `${ENV.WEB_VIEW_URL}/main`;

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
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

  return (
    <SafeAreaView className="flex-1">
      <WebView
        ref={webViewRef}
        className="flex-1 bg-gray"
        source={{ uri: initialUrl }}
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
}

export default Index;
