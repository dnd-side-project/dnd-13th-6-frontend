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
        source={{ uri: `${ENV.WEB_VIEW_URL}/main` }}
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
