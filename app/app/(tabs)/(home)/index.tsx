import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { ENV } from '@/utils/app/consts';
import { WebView } from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Index() {
  const isDev = __DEV__;
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: `${ENV.WEB_VIEW_URL}/` }}
        // 개발 환경에서만 SSL 오류 무시
        {...(isDev && {
          onShouldStartLoadWithRequest: () => true,
          mixedContentMode: 'compatibility',
          allowsInlineMediaPlayback: true,
          allowsBackForwardNavigationGestures: true,
          // Android SSL 오류 처리
          onReceivedSslError: (event: any) => {
            console.log('SSL Error received, proceeding anyway');
            event.nativeEvent.proceed();
          },
          // 추가 SSL 관련 설정
          onReceivedHttpError: (event: any) => {
            console.log('HTTP Error:', event.nativeEvent);
          },
          onError: (event: any) => {
            console.log('WebView Error:', event.nativeEvent);
          },
          // iOS에서 보안 설정 완화
          allowingReadAccessToURL: `${ENV.WEB_VIEW_URL}`,
          // 개발 환경에서 모든 요청 허용
          originWhitelist: ['*'],
          // 자바스크립트 활성화
          javaScriptEnabled: true,
          // DOM 저장소 허용
          domStorageEnabled: true,
          // 쿠키 허용
          thirdPartyCookiesEnabled: true,
          sharedCookiesEnabled: true
        })}
      />
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight
  },
  webview: {
    flex: 1,
    backgroundColor: '#333333'
  },
  runningButton: {
    backgroundColor: 'gray',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  runningButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
