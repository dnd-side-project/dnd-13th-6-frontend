import { Dimensions, View, Text, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef } from 'react';
import WebView from 'react-native-webview';
import { ENV } from '@/utils/app/consts';
import { StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function Index() {
  const inset = useSafeAreaInsets();
  const webviewRef = useRef<WebView>(null);
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        source={{ uri: 'https://web.runky.store' + '/calendar' }}
      />
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1,
    backgroundColor: '#333333'
  }
});
