import { ENV } from '@/utils/app/consts';
import { Dimensions, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function RunningShare() {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{
          uri: ENV.WEB_VIEW_URL + '/group-running'
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
    width: windowWidth,
    height: windowHeight
  }
});
