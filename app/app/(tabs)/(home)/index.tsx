import { MODULE } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Pressable, View, Text } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
function Index() {
  const insets = useSafeAreaInsets();
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
    <View
      className="flex-1"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Pressable
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onPress={() => router.push('/(tabs)/(group)/code')}
      >
        <Text className="text-white">Test</Text>
      </Pressable>
      <WebView
        ref={webViewRef}
        className="flex-1 bg-gray"
        source={{ uri: initialUrl }}
        onMessage={handleMessage}
      />
    </View>
  );
}

export default Index;
