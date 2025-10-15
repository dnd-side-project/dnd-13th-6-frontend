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
  const { showAlert } = useCustomAlert();
  const { crewMembers, crewInfo } = useContext(CrewContext);
  const initialUrl = ENV.WEB_VIEW_URL + '/group/running?q=' + crewInfo?.crewId;

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data || '{}');
      if (data?.type === 'CONTENT_HEIGHT' && typeof data.height === 'number') {
        // 최소 높이 보장, 최대 높이 제한
        const adjustedHeight = Math.max(600, Math.min(data.height, 2000));
        setContentHeight(adjustedHeight);
        console.log('WebView height adjusted to:', adjustedHeight);
      }
    } catch (e) {
      console.error('Failed to parse WebView message:', e);
    }
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
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}
      nestedScrollEnabled={true}
      className="bg-gray"
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
          {
            flex: 1,
            width: windowWidth,
            opacity: isLoading ? 0 : 1
          }
        ]}
        scrollEnabled={false}
        bounces={false}
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
