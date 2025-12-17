import React, { forwardRef } from 'react';
import WebView, { WebViewProps } from 'react-native-webview';

// iOS 웹뷰 바운스를 완전히 막기 위한 JavaScript 코드
const injectedJavaScript = `
  (function() {
    // 확대(줌) 방지 - 더블탭과 핀치 줌 차단
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault(); // 더블탭 줌 방지
      }
      lastTouchEnd = now;
    }, { passive: false });

    // 멀티터치(핀치 줌) 방지
    document.addEventListener('touchstart', function(e) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // 터치 이동 중 스케일 변경 방지
    document.addEventListener('touchmove', function(e) {
      if (e.scale !== 1) {
        e.preventDefault();
      }
    }, { passive: false });

    // 제스처 이벤트 차단 (iOS Safari)
    document.addEventListener('gesturestart', function(e) {
      e.preventDefault();
    }, { passive: false });

    // body와 html의 overscroll 방지
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    
    // webkit 특정 속성 설정
    document.body.style.webkitOverflowScrolling = 'touch';
    document.documentElement.style.webkitOverflowScrolling = 'touch';

    // 스크롤바 숨김
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
      />
    );
  }
);

AuthenticatedWebView.displayName = 'AuthenticatedWebView';

export default AuthenticatedWebView;
