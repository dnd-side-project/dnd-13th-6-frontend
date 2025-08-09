import { IconSymbol } from '@/components/ui/IconSymbol';
import {
  getCurrentSpeed,
  getDistanceFromLatLonInMeters
} from '@/utils/geolocation';
import { STORAGE_KEY, getStorage, setStorage } from '@/utils/storage';
import { generatePostMessage, receiveMessage } from '@/utils/webView';
import { POST_MESSAGE_TYPE } from '@/utils/webView/consts';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface RunningData {
  latitude: number;
  longitude: number;
  distance: number;
  time: number;
  speed: number;
}

const INTERVAL_TIME = 10 * 1000;

function Index() {
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const webviewRef = useRef<WebView>(null);

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low
    });
    return location;
  };

  const postGeoLocation = async () => {
    const location = await getLocation();
    setLocation(location);

    /**
     * Async Storage에 위치 정보를 저장한다.
     * 만약 위치 정보가 없다면 Async Storage에 위치 정보를 저장한다.
     * 만약 위치 정보가 있다면 마지막 위치와 현재 위치의 거리를 계산한다.
     * 만약 거리가 10m인 경우에만 위치 정보를 저장한다.
     */

    const saveLocation = async () => {
      try {
        const runningData =
          (await getStorage<RunningData[]>(STORAGE_KEY.RUNNING_DATA)) || [];
        const { latitude, longitude } = location.coords;
        //Async Storage에 위치 정보를 가져온다. 이 때 위치 정보가 없다면 값을 바로 추가한다.

        const currentRunningData: RunningData = {
          latitude,
          longitude,
          distance: 0,
          time: INTERVAL_TIME,
          speed: 0
        };
        console.log(runningData);
        if (runningData.length) {
          const { latitude: lastLatitude, longitude: lastLongitude } =
            runningData[runningData.length - 1];
          const distance = getDistanceFromLatLonInMeters(
            latitude,
            longitude,
            lastLatitude,
            lastLongitude
          );
          const speed = getCurrentSpeed(distance, 10);
          currentRunningData.distance = distance;
          currentRunningData.speed = speed;
          console.log(distance);
          if (distance > 10) {
            postMessage(POST_MESSAGE_TYPE.MESSAGE, currentRunningData);
          }
        } else {
          console.log('here');
          postMessage(POST_MESSAGE_TYPE.MESSAGE, currentRunningData);
        }

        runningData.push(currentRunningData);
        await setStorage(STORAGE_KEY.RUNNING_DATA, runningData);
      } catch (error) {
        Alert.alert('위치 정보 저장 실패:', (error as Error).message);
      }
    };

    if (!intervalId) {
      saveLocation();
      const id = setInterval(() => {
        saveLocation();
      }, INTERVAL_TIME);
      setIntervalId(id);
    }
  };

  const postMessage = (type: POST_MESSAGE_TYPE, data: RunningData) => {
    const message = generatePostMessage(type, data);
    if (webviewRef.current) webviewRef.current.postMessage(message);
  };

  useEffect(() => {
    const init = async () => {
      const locationList = await getStorage<RunningData[]>(
        STORAGE_KEY.RUNNING_DATA
      );
      if (locationList) await setStorage(STORAGE_KEY.RUNNING_DATA, []);
    };
    init();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);
  console.log(process.env.EXPO_PUBLIC_WEBVIEW_URL);
  return (
    <SafeAreaView style={styles.container}>
      {!intervalId && (
        <Pressable onPress={postGeoLocation}>
          <Text>운동 시작하기</Text>
        </Pressable>
      )}

      <Pressable onPress={() => router.back()}>
        <IconSymbol size={28} name="arrow.left" color="black" />
      </Pressable>
      <WebView
        ref={webviewRef}
        onMessage={receiveMessage}
        style={styles.webview}
        source={{
          uri: Constants.expoConfig?.extra?.EXPO_PUBLIC_WEBVIEW_URL + '/test'
        }}
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
