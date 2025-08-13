import Constants from 'expo-constants';
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
          uri:
            Constants.expoConfig?.extra?.EXPO_PUBLIC_WEBVIEW_URL +
            '/group-running'
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
