import React, { forwardRef, useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import WebView, { WebViewProps } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Colors';


const injectedJavaScript = `
(function () {

  let lastTouchEnd = 0;

  // 더블탭 줌 방지
  document.addEventListener(
    'touchend',
    function (e) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false }
  );

  // 멀티터치(핀치 줌) 방지
  document.addEventListener(
    'touchstart',
    function (e) {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // iOS 제스처 확대 방지
  document.addEventListener(
    'gesturestart',
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );
})();
true;
`;

// 스타일 정의 (renderLoading 함수보다 먼저 정의되어야 함)
const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.web.background
  }
});


// 로딩 중 보여줄 컴포넌트
const renderLoading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={Colors.web.primary} />
  </View>
);

const AuthenticatedWebView = forwardRef<WebView, WebViewProps>(
  ({ source, injectedJavaScript: customInjectedJS, injectedJavaScriptBeforeContentLoaded: customInjectedJSBefore, onMessage, ...props }, ref) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // AsyncStorage에서 토큰 읽기
    useEffect(() => {
      const loadToken = async () => {
        try {
          const token = await AsyncStorage.getItem('accessToken');
          setAccessToken(token);
        } catch (e) {
          console.error('Failed to load access token from AsyncStorage', e);
        }
      };
      loadToken();
    }, []);

    // WebView에서 메시지 수신 처리
    const handleMessage = async (event: any) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        
        if (data.type === 'CLEAR_TOKENS') {
          // AsyncStorage에서 토큰들 삭제
          await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
          console.log('Tokens cleared from AsyncStorage:', data.action);
          setAccessToken(null);
        }
      } catch (e) {
        console.error('Failed to parse message from WebView', e);
      }
      
      // 기존 onMessage 핸들러도 호출
      if (onMessage) {
        onMessage(event);
      }
    };

    const headers = {
      'X-App-Auth': process.env.EXPO_PUBLIC_APP_WEBVIEW_SECRET || ''
    };

    const newSource =
      typeof source === 'number'
        ? source
        : {
            ...source,
            headers: {
              ...source?.headers,
              ...headers
            }
          };

    // 기존 injectedJavaScript와 바운스 방지 스크립트 결합
    const combinedJS = customInjectedJS 
      ? `${injectedJavaScript}\n${customInjectedJS}`
      : injectedJavaScript;

    // 토큰을 localStorage에 주입하는 스크립트
    const tokenInjectionScript = accessToken
      ? `localStorage.setItem('accessToken', ${JSON.stringify(accessToken)});`
      : '';

    // props로 전달된 injectedJavaScriptBeforeContentLoaded와 병합
    const combinedJSBefore = [tokenInjectionScript, customInjectedJSBefore]
      .filter(Boolean)
      .join('\n');

    return (
      <WebView
        ref={ref}
        source={newSource}
        {...props}
        style={[{ flex: 1 }, (props as any).style]} // 기본으로 flex:1 적용
        backgroundColor="#211e22" // 웹 앱 배경색과 일치
        bounces={false}
        scrollEnabled={props.scrollEnabled !== false}
        injectedJavaScript={Platform.OS !== 'web' ? combinedJS : undefined}
        injectedJavaScriptBeforeContentLoaded={Platform.OS !== 'web' ? combinedJSBefore : undefined}
        startInLoadingState={true}
        renderLoading={renderLoading}
        onMessage={handleMessage}
      />
    );
  }
);

AuthenticatedWebView.displayName = 'AuthenticatedWebView';

export default AuthenticatedWebView;
