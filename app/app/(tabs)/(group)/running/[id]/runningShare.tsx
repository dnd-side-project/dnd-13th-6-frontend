import { ENV } from '@/utils/app/consts';
import { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useWebView } from '@/hooks/useWebView';
import { MemberData } from '@/types/crew';
import { POST_MESSAGE_TYPE } from '@/utils/webView/consts';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function RunningShare() {
  const { webviewRef, postMessage } = useWebView<MemberData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initialUrl = ENV.WEB_VIEW_URL + '/group/running';
  const dummyCrewMembers: MemberData[] = [
    {
      nickname: 'leader',
      memberId: '1',
      character: '1'
    }
  ];

  const handleWebViewLoad = () => {
    setIsLoading(false);
    // WebView 로딩 완료 후 메시지 전송
    setTimeout(() => {
      postMessage(POST_MESSAGE_TYPE.SET_CREW_MEMBERS, dummyCrewMembers);
    }, 100);
  };

  useFocusEffect(
    useCallback(() => {
      if (webviewRef.current) {
        const script = `window.location.href = '${initialUrl}'; true;`;
        webviewRef.current.injectJavaScript(script);
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#313131"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      )}
      <WebView
        ref={webviewRef}
        style={[styles.webview, { opacity: isLoading ? 0 : 1 }]}
        onLoadEnd={handleWebViewLoad}
        source={{
          uri: initialUrl
        }}
      />
    </View>
  );
}

export default RunningShare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  webview: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#313131'
  }
});
