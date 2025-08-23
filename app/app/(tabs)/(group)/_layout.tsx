import { ENV } from '@/utils/app/consts';
import { useLayoutEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardEventName,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Platform
} from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function RunningShare() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const webviewRef = useRef<WebView>(null);
  useLayoutEffect(() => {
    const getEvent = (listener: KeyboardEventName) => {
      return Keyboard.addListener(listener, () => {
        return webviewRef.current?.postMessage(JSON.stringify('내용'));
      });
    };

    const event = getEvent('keyboardWillShow');

    return () => {
      event.remove();
    };
  }, [webviewRef]);
  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      > */}
      <WebView
        ref={webviewRef}
        style={styles.webview}
        keyboardDisplayRequiresUserAction={false}
        source={{ uri: ENV.WEB_VIEW_URL + '/group' }}
        onLoadEnd={() => setIsLoading(false)}
        onLoadStart={() => setIsLoading(true)}
      />
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
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
