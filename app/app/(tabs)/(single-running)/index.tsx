import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { router, usePathname } from 'expo-router';
import {
  Alert,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { IconSymbol } from '@/components/ui/IconSymbol';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Index() {
  const inset = useSafeAreaInsets();
  const pathname = usePathname();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const webviewRef = useRef<WebView>(null);
  const getGeoLocationPermission = async () => {
    try {
      let { status: foregroundPermission } =
        await Location.requestForegroundPermissionsAsync();
      let { status: backgroundPermission } =
        await Location.requestBackgroundPermissionsAsync();

      if (
        foregroundPermission !== 'granted' &&
        backgroundPermission !== 'granted'
      ) {
        Alert.alert(
          '위치 권한이 필요합니다',
          '앱에서 위치 정보를 사용하려면 권한을 허용해주세요.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      setLocation(location);
      postMessage(
        'message',
        `${location.coords.latitude}, ${location.coords.longitude}`
      );

      Alert.alert('위치 정보 전송됨', '위치 정보가 웹페이지로 전송되었습니다.');
    } catch (error) {
      console.error('위치 정보 가져오기 실패:', error);
      Alert.alert('오류', '위치 정보를 가져올 수 없습니다.');
    }
  };

  const postMessage = (type: string, data: any) => {
    const message = {
      type,
      message: data,
      timestamp: Date.now(),
      platform: Platform.OS
    };

    const messageString = JSON.stringify(message);
    console.log('웹으로 전송하는 메시지:', messageString);
    if (webviewRef.current) {
      webviewRef.current.postMessage(messageString);
    }
  };

  const onMessage = (event: WebViewMessageEvent) => {
    console.log('웹에서 받은 메시지:', event.nativeEvent.data);
  };

  console.log(pathname, 'here');

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={getGeoLocationPermission}>
        <Text>Get Location</Text>
      </Pressable>
      <Pressable onPress={() => router.back()}>
        <IconSymbol size={28} name="arrow.left" color="black" />
      </Pressable>
      <WebView
        ref={webviewRef}
        onMessage={onMessage}
        style={styles.webview}
        source={{ uri: 'http://localhost:3000/test' }}
      />
    </SafeAreaView>
  );
}

export default Index;

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
