import { ENV } from '@/utils/app/consts';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function RunningShare() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        style={[styles.webview, { opacity: isLoading ? 0 : 1 }]}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
        source={{
          uri: ENV.WEB_VIEW_URL + '/group/running'
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
