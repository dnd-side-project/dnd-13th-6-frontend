import {
  getCurrentSpeed,
  getDistanceFromLatLonInMeters
} from '@/utils/geolocation';
import { STORAGE_KEY, getStorage, setStorage } from '@/utils/storage';
import { POST_MESSAGE_TYPE, SEND_MESSAGE_TYPE } from '@/utils/webView/consts';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  AppState,
  View,
  Image
} from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import * as TaskManager from 'expo-task-manager';
import { RunningData } from '@/types/runnintTypes';
import Chip from '@/components/chips/Chip';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAppState } from '@/utils/app';
import { useWebView } from '@/hooks/useWebView';
import { ENV } from '@/utils/app/consts';
import dayjs from 'dayjs';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const INTERVAL_TIME = 5 * 1000;

const setRunningData = (
  latitude: number,
  longitude: number,
  lastRunningData?: RunningData
) => {
  const currentRunningData: RunningData = {
    latitude,
    longitude,
    distance: 0,
    timestamp: dayjs(new Date()).format('YYYYMMDDHHmmss'),
    speed: 0
  };
  if (!lastRunningData) {
    return currentRunningData;
  }
  const distance = getDistanceFromLatLonInMeters(
    latitude,
    longitude,
    lastRunningData.latitude,
    lastRunningData.longitude
  );
  const speed = getCurrentSpeed(distance, 10);
  currentRunningData.distance = distance;
  currentRunningData.speed = speed;
  return currentRunningData;
};

// 백그라운드 위치 업데이트 Task 정의
TaskManager.defineTask(
  STORAGE_KEY.RUNNING_PENDING_MESSAGES,
  async ({ data, error }) => {
    if (error) {
      Alert.alert('백그라운드 위치 저장 중 에러가 발생했어요');
      return;
    }
    const payload = data as
      | { locations?: Location.LocationObject[] }
      | undefined;
    const locations = payload?.locations ?? [];
    if (!locations.length) return;

    const latest = locations[0];
    try {
      const runningData =
        (await getStorage<RunningData[]>(
          STORAGE_KEY.RUNNING_PENDING_MESSAGES
        )) || [];
      const { latitude, longitude } = latest.coords;

      const currentRunningData = setRunningData(
        latitude,
        longitude,
        runningData.length ? runningData[runningData.length - 1] : undefined
      );

      runningData.push(currentRunningData);

      await setStorage(STORAGE_KEY.RUNNING_PENDING_MESSAGES, runningData);
    } catch (e) {
      console.error('백그라운드 위치 저장 실패:', e);
    }
  }
);

const startBackgroundLocation = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === 'granted') {
    //정의한 Task를 실행
    await Location.startLocationUpdatesAsync(
      STORAGE_KEY.RUNNING_PENDING_MESSAGES,
      {
        accuracy: Location.Accuracy.High,
        timeInterval: INTERVAL_TIME,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: '러닝 중 위치 추적',
          notificationBody: '러닝 기록을 위해 위치를 추적 중입니다.'
        }
      }
    );
  } else {
    Alert.alert('백그라운드 위치 권한이 필요합니다.');
  }
};

const stopBackgroundLocation = async () => {
  //Task가 등록되어 있는지 검사.
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    STORAGE_KEY.RUNNING_PENDING_MESSAGES
  );
  if (isRegistered) {
    await Location.stopLocationUpdatesAsync(
      STORAGE_KEY.RUNNING_PENDING_MESSAGES
    );
  }
};

function Index() {
  const insets = useSafeAreaInsets();
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  //TODO.. 위치 표시 UI 추가시 구현
  const [isGPSEnabled, setIsGPSEnabled] = useState<boolean>(false);

  const { webviewRef, postMessage } = useWebView<RunningData>();
  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low
    });
    return location;
  };

  const postGeoLocation = async () => {
    setIsRunning(true);
    const location = await getLocation();

    /**
     * Async Storage에 위치 정보를 저장한다.
     * 만약 위치 정보가 없다면 Async Storage에 위치 정보를 저장한다.
     * 만약 위치 정보가 있다면 마지막 위치와 현재 위치의 거리를 계산한다.
     * 만약 거리가 5m인 경우에만 위치 정보를 저장한다.
     */

    const saveLocation = async (runningData: RunningData[] = []) => {
      try {
        const providerStatus = await Location.getProviderStatusAsync();
        setIsGPSEnabled(providerStatus.locationServicesEnabled);
        const { latitude, longitude } = location.coords;
        //Async Storage에 위치 정보를 가져온다. 이 때 위치 정보가 없다면 값을 바로 추가한다.

        const currentRunningData = setRunningData(
          latitude,
          longitude,
          runningData.length ? runningData[runningData.length - 1] : undefined
        );
        //5m 이상 이동했거나 첫 위치 메시지라면 데이터 전송
        if (currentRunningData.distance >= 5 || !runningData.length)
          postMessage(POST_MESSAGE_TYPE.MESSAGE, currentRunningData);
        runningData.push(currentRunningData);
        await setStorage(STORAGE_KEY.RUNNING_DATA, runningData);
      } catch (error) {
        Alert.alert('위치 정보 저장 실패:', (error as Error).message);
      }
    };

    if (!intervalId) {
      const runningData =
        (await getStorage<RunningData[]>(STORAGE_KEY.RUNNING_DATA)) || [];
      await saveLocation(runningData);
      const id = setInterval(async () => {
        await saveLocation(runningData);
      }, INTERVAL_TIME);
      setIntervalId(id);
    }
  };

  const receiveMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    switch (data.type) {
      case SEND_MESSAGE_TYPE.RUNNING_START:
        setIsRunning(true);
        postGeoLocation();
        break;
      case SEND_MESSAGE_TYPE.RUNNING_END:
        if (intervalId) clearInterval(intervalId);
        setIntervalId(null);
        setIsRunning(false);
        stopBackgroundLocation();
        //TODO.. 운동 종료 로직 추가
        setStorage(STORAGE_KEY.RUNNING_DATA, []);
        setStorage(STORAGE_KEY.RUNNING_PENDING_MESSAGES, []);
        break;
      case SEND_MESSAGE_TYPE.RUNNING_PAUSE:
        if (intervalId) clearInterval(intervalId);
        setIntervalId(null);
        setIsRunning(false);
        stopBackgroundLocation();
        break;
    }
  };

  //백그라운드에서 모아뒀던 메시지를 포그라운드로 전달
  const flushPendingMessages = async () => {
    if (!webviewRef.current) return;
    const pending = await getStorage<RunningData[]>(
      STORAGE_KEY.RUNNING_PENDING_MESSAGES
    );
    const previousData =
      (await getStorage<RunningData[]>(STORAGE_KEY.RUNNING_DATA)) || [];
    if (!pending || !pending.length) return;

    for (const pkt of pending) postMessage(POST_MESSAGE_TYPE.MESSAGE, pkt);

    previousData.push(...pending);
    setStorage(STORAGE_KEY.RUNNING_DATA, previousData);
    setStorage(STORAGE_KEY.RUNNING_PENDING_MESSAGES, []);
  };

  useEffect(() => {
    // 앱 상태 전환에 따라 백그라운드 위치 업데이트 on/off
    const appStateRef = { current: AppState.currentState } as {
      current: string;
    };
    const subscription = AppState.addEventListener('change', async next => {
      const appState = getAppState(next);
      if (appState === 'background' && isRunning) {
        await stopBackgroundLocation();
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
        await startBackgroundLocation();
      }

      // 백그라운드에서 포그라운드로 이동하고 운동 중이면 백그라운드 위치 업데이트 중지
      if (appState === 'foreground' && isRunning) {
        await stopBackgroundLocation();
        // 포그라운드 복귀 시 큐에 쌓인 메시지를 WebView로 전달
        await flushPendingMessages();
        postGeoLocation();
      }
      appStateRef.current = next as string;
    });
    return () => {
      if (intervalId) clearInterval(intervalId);
      subscription.remove();
    };
  }, [isRunning, intervalId]);

  useEffect(() => {
    const init = async () => {
      const locationList = await getStorage<RunningData[]>(
        STORAGE_KEY.RUNNING_DATA
      );
      const pending = await getStorage<RunningData[]>(
        STORAGE_KEY.RUNNING_PENDING_MESSAGES
      );
      if (pending) await setStorage(STORAGE_KEY.RUNNING_PENDING_MESSAGES, []);
      if (locationList) await setStorage(STORAGE_KEY.RUNNING_DATA, []);
    };
    init();
  }, []);
  return (
    <View style={styles.container}>
      <Chip style={[styles.chip, { top: insets.top + 30 }]}>
        <View style={styles.chipContent}>
          <Image
            source={require('@/assets/images/ellipse-green.png')}
            style={{ width: 16, height: 16 }}
          />
          <Text style={styles.chipText}>GPS 연결됨</Text>
        </View>
      </Chip>
      <WebView
        ref={webviewRef}
        onMessage={receiveMessage}
        style={styles.webview}
        source={{
          uri: ENV.WEB_VIEW_URL + '/running-session'
        }}
      />
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    position: 'relative'
  },
  //웹뷰 기준으로 띄우기 위해 절대 위치 사용
  chip: {
    backgroundColor: 'rgba(28, 28, 30, 0.5)',
    position: 'absolute',
    zIndex: 100,
    left: 16
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  chipText: {
    color: '#fff',
    opacity: 1,
    fontSize: 14
  }
});
