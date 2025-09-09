import { MODULE } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

function Index() {
  const webViewRef = useRef<WebView>(null);
  const initialUrl = `${ENV.WEB_VIEW_URL}/main`;

  const handleMessage = async (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('data', data);
    if (data.type === MODULE.AUTH) {
      if (data?.accessToken) {
        console.log('accessToken', data.accessToken);
        AsyncStorage.setItem('accessToken', data.accessToken);
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log('accessToken', accessToken);
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
           mixedContentMode="always" // HTTP 리소스 허용
      />
    </SafeAreaView>
  );
}

export default Index;
