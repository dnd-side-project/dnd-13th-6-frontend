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
    const message = JSON.parse(event.nativeEvent.data);
    const { type, accessToken, nickName, userId, data } = message;
    
    if (type === MODULE.AUTH) {
      if (accessToken) {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.setItem('accessToken', accessToken);
        if (nickName && userId) {
          AsyncStorage.setItem(
            'user',
            JSON.stringify({
              nickname: nickName,
              userId: userId
            })
          );
        }
      } else {
        router.replace('/(tabs)/(onboarding)');
      }
    } else if (type === MODULE.PUSH) {
      const { type, url } = JSON.parse(data);
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
    
    // 추가 사용자 정보 저장
    if (nickName) {
      AsyncStorage.setItem('nickName', nickName);
    }
    if (userId) {
      AsyncStorage.setItem('userId', userId);
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
