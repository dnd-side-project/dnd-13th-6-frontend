import React, { forwardRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import WebView, { WebViewProps } from 'react-native-webview';
import { Colors } from '../constants/Colors';
// iOS 웹뷰 바운스를 완전히 막기 위한 JavaScript 코드
// const injectedJavaScript = `
//   (function() {
//     let lastTouchEnd = 0;
//     document.addEventListener('touchend', function(e) {
//       const now = Date.now();
//       if (now - lastTouchEnd <= 300) {
//         e.preventDefault(); 
//       }
//       lastTouchEnd = now;
//     }, { passive: false });

//     document.addEventListener('touchstart', function(e) {
//       if (e.touches.length > 1) {
//         e.preventDefault();
//       }
//     }, { passive: false });
    
//     document.addEventListener('touchmove', function(e) {
//       if (e.scale !== 1) {
//         e.preventDefault();
//       }
//     }, { passive: false });

//     document.addEventListener('gesturestart', function(e) {
//       e.preventDefault();
//     }, { passive: false });

//     document.body.style.overscrollBehavior = 'none';
//     document.documentElement.style.overscrollBehavior = 'none';
    
//     document.body.style.webkitOverflowScrolling = 'touch';
//     document.documentElement.style.webkitOverflowScrolling = 'touch';

//     const style = document.createElement('style');
//     style.textContent = \`
//       * {
//         -ms-overflow-style: none;
//         scrollbar-width: none;
//       }
//       *::-webkit-scrollbar {
//         display: none;
//       }
//     \`;
//     document.head.appendChild(style);
//   })();
//   true;
// `;

const injectedJavaScript = `
(function () {
  // 이 스크립트는 DOM 구조나 스타일을 변경하지 않는다.
  // 오직 사용자 제스처 이벤트만 제어한다.

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent' // 로딩 오버레이가 탭바까지 가리는 걸 방지
  }
});

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
        style={[{ flex: 1 }, (props as any).style]} // 기본으로 flex:1 적용
        bounces={false}
        scrollEnabled={props.scrollEnabled !== false}
        injectedJavaScript={Platform.OS !== 'web' ? combinedJS : undefined}
        startInLoadingState={true}
        renderLoading={renderLoading}
      />
    );
  }
);

AuthenticatedWebView.displayName = 'AuthenticatedWebView';

export default AuthenticatedWebView;
