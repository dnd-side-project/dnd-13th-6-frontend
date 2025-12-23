import AuthenticatedWebView from '@/components/AuthenticatedWebView';
import { MODULE } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
function Index() {
  const webViewRef = useRef<WebView>(null);
  const [webViewKey, setWebViewKey] = useState(0);
  const handleMessage = async (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === MODULE.AUTH) {
      if (data?.accessToken) {
      AsyncStorage.removeItem('accessToken');
        AsyncStorage.setItem('accessToken', data.accessToken);
        AsyncStorage.setItem(
          'user',
          JSON.stringify({
            nickname: data.nickName,
            userId: data.userId
          })
        );
      } else router.replace('/(tabs)/(onboarding)');
    } else if (data.type === MODULE.PUSH) {
      const { type, url } = JSON.parse(data.data);
      console.log(url, type);
      if (url === '/(onboarding)' || url === '/(tabs)/(onboarding)') {
        setWebViewKey(prev => prev + 1);
        router.replace('/(tabs)/(onboarding)');
      } else if (url === '/(tabs)/(home)') {
        console.log('r');
        return;
      } else {
        router.push(url);
      }
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
      <AuthenticatedWebView
        className="flex-1 h-full bg-gray border"
        ref={webViewRef}
        key={webViewKey}
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
