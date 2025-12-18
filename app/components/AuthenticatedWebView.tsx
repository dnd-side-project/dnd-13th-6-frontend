import React, { forwardRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import WebView, { WebViewProps } from 'react-native-webview';
import { Colors } from '../constants/Colors';
// iOS 웹뷰 바운스를 완전히 막기 위한 JavaScript 코드
const injectedJavaScript = `
  (function() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault(); 
      }
      lastTouchEnd = now;
    }, { passive: false });

    document.addEventListener('touchstart', function(e) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
      if (e.scale !== 1) {
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('gesturestart', function(e) {
      e.preventDefault();
    }, { passive: false });

    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    
    document.body.style.webkitOverflowScrolling = 'touch';
    document.documentElement.style.webkitOverflowScrolling = 'touch';

    const style = document.createElement('style');
    style.textContent = \`
      * {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      *::-webkit-scrollbar {
        display: none;
      }
    \`;
    document.head.appendChild(style);
  })();
  true;
`;

// 로딩 중 보여줄 컴포넌트
const renderLoading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={Colors.web.primary} />
  </View>
);

const AuthenticatedWebView = forwardRef<WebView, WebViewProps>(
  ({ source, injectedJavaScript: customInjectedJS, ...props }, ref) => {
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

    return (
      <WebView 
        ref={ref} 
        source={newSource}  
        {...props} 
        bounces={false}
        scrollEnabled={props.scrollEnabled !== false}
        injectedJavaScript={combinedJS}
        startInLoadingState={true}
        renderLoading={renderLoading}
      />
    );
  }
);

AuthenticatedWebView.displayName = 'AuthenticatedWebView';

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

export default AuthenticatedWebView;
