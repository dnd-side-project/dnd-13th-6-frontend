import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { ENV } from '@/utils/app/consts';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { MODULE } from '@/utils/apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Index() {
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === MODULE.AUTH) {
      AsyncStorage.setItem('accessToken', data.accessToken);
    }
    if (data.nickName) {
      AsyncStorage.setItem('nickName', data.nickName);
    }
    if (data.userId) {
      AsyncStorage.setItem('userId', data.userId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: `${ENV.WEB_VIEW_URL}/main` }}
        onMessage={handleMessage}
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
