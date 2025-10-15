import { MODULE } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
function Index() {
  const webViewRef = useRef<WebView>(null);
  const handleMessage = async (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === MODULE.AUTH) {
      if (data?.accessToken) {
        AsyncStorage.setItem('accessToken', data.accessToken);
        AsyncStorage.setItem(
          'user',
          JSON.stringify({
            nickname: data.nickName,
            userId: data.userId
          })
        );
      }
    } else if (data.type === MODULE.PUSH) {
      const { type, url } = JSON.parse(data.data);
      if (url === '/(onboarding)') {
        router.replace('/(tabs)/(onboarding)');
      } else if (url === '/(tabs)/(home)') {
        router.replace('/(tabs)/(home)');
      } else {
        router.push(url);
      }
      // if (url === '/(tabs)/(home)' || url === '/(tabs)/(onboarding)') {
      //   router.replace(url);
      // } else {
      //   router.push(url);
      // }
    }
    if (data.nickName) {
      AsyncStorage.setItem('nickName', data.nickName);
    }
    if (data.userId) {
      AsyncStorage.setItem('userId', data.userId);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      className="flex-1 align-center justify-between py-4"
    >
      <WebView
        className="flex-1 h-full bg-gray border"
        ref={webViewRef}
        style={styles.webview}
        showsVerticalScrollIndicator={false}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: ENV.WEB_VIEW_URL + '/main' }}
        onMessage={handleMessage}
        bounces={false}
        overScrollMode={'never'}
        mixedContentMode="always" // HTTP 리소스 허용
      />
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  webview: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
});
