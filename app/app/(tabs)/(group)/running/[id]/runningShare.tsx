import { useCustomAlert } from '@/hooks/useCustomAlert';
import { useWebView } from '@/hooks/useWebView';
import { MemberData } from '@/types/crew';
import { ENV } from '@/utils/app/consts';
import { POST_MESSAGE_TYPE } from '@/utils/webView/consts';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { CrewContext } from './_layout';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//[id] 파라미터 가져오기

function RunningShare() {
  const { webviewRef, postMessage } = useWebView<MemberData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();
  const { crewMembers, crewInfo } = useContext(CrewContext);
  const initialUrl = ENV.WEB_VIEW_URL + '/group/running?q=' + crewInfo?.crewId;
  const handleWebViewLoad = () => {};

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
    <View className="flex-1 justify-between items-center">
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
        style={[styles.webview, { opacity: isLoading ? 0 : 1 }]}
        onLoadEnd={handleWebViewLoad}
        mixedContentMode="always" // HTTP 리소스 허용
        source={{
          uri: initialUrl
        }}
      />
    </View>
  );
}

export default RunningShare;

const styles = StyleSheet.create({
  webview: {
    height: windowHeight,
    width: windowWidth
  }
});
