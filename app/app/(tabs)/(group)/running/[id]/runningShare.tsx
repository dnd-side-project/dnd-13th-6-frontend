import { useCustomAlert } from '@/hooks/useCustomAlert';
import { useWebView } from '@/hooks/useWebView';
import { MemberData } from '@/types/crew';
import { ENV } from '@/utils/app/consts';
import { POST_MESSAGE_TYPE } from '@/utils/webView/consts';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { CrewContext } from './_layout';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//[id] 파라미터 가져오기

function RunningShare() {
  const { webviewRef, postMessage } = useWebView<MemberData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contentHeight, setContentHeight] = useState<number>(windowHeight);
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();
  const { crewMembers, crewInfo } = useContext(CrewContext);
  const initialUrl = ENV.WEB_VIEW_URL + '/group/running?q=' + crewInfo?.crewId;
  const handleWebViewLoad = () => {};
  // const measureHeightJS = `
  //   (function() {
  //     function postHeight() {
  //       try {
  //         var body = document.body;
  //         var html = document.documentElement;
  //         var height = Math.max(
  //           body.scrollHeight,
  //           body.offsetHeight,
  //           html.clientHeight,
  //           html.scrollHeight,
  //           html.offsetHeight
  //         );
  //         window.ReactNativeWebView && window.ReactNativeWebView.postMessage(
  //           JSON.stringify({ type: 'CONTENT_HEIGHT', height: height })
  //         );
  //       } catch (e) {}
  //     }
  //     try {
  //       var css = 'html, body { overflow: hidden !important; overscroll-behavior: none !important; }';
  //       var style = document.createElement('style');
  //       style.type = 'text/css';
  //       style.appendChild(document.createTextNode(css));
  //       document.head.appendChild(style);
  //     } catch (e) {}
  //     window.addEventListener('load', postHeight);
  //     window.addEventListener('resize', postHeight);
  //     var observer = new MutationObserver(function() { postHeight(); });
  //     observer.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
  //     setTimeout(postHeight, 100);
  //     setTimeout(postHeight, 500);
  //     true;
  //   })();
  // `;

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data || '{}');
      if (data?.type === 'CONTENT_HEIGHT' && typeof data.height === 'number') {
        // 상한/하한 가드
        const minHeight = Math.max(400, Math.min(data.height, 4000));
        setContentHeight(minHeight);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (crewMembers && webviewRef.current) {
      setIsLoading(false);
      postMessage(POST_MESSAGE_TYPE.SET_CREW_MEMBERS, crewMembers.members);
    }
  }, [crewMembers, webviewRef]);

  //alert와 함께 미구현된 기능입니다
  useFocusEffect(
    useCallback(() => {
      if (webviewRef.current) {
        const script = `window.location.href = '${initialUrl}'; true;`;
        webviewRef.current.injectJavaScript(script);
      }
      showAlert({
        title: '알림',
        message: '알림 메시지',
        buttons: [
          {
            text: '확인',
            onPress: () => {
              router.push('/(tabs)/(group)/running/[id]');
            },
            className: 'bg-main'
          }
        ]
      });
    }, [])
  );

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#313131"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      )}
      <WebView
        ref={webviewRef}
        className="flex-1 bg-gray"
        style={[
          styles.webview,
          { height: contentHeight, opacity: isLoading ? 0 : 1 }
        ]}
        onLoadEnd={handleWebViewLoad}
        scrollEnabled={false}
        overScrollMode="never"
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        mixedContentMode="always"
        onMessage={handleWebViewMessage}
        source={{
          uri: initialUrl
        }}
      />
    </ScrollView>
  );
}

export default RunningShare;

const styles = StyleSheet.create({
  webview: {
    height: windowHeight,
    width: windowWidth
  }
});
