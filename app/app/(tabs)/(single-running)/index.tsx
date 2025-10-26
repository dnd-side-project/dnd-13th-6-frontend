import GpsInfoChip from '@/components/chips/GpsInfoChip';
import { useWebView } from '@/hooks/useWebView';
import { RunningData } from '@/types/runnintTypes';
import { MODULE } from '@/utils/apis/api';
import { getAppState } from '@/utils/app';
import { ENV } from '@/utils/app/consts';
import {
  getCurrentSpeed,
  getDistanceFromLatLonInMeters
} from '@/utils/geolocation';
import { STORAGE_KEY, getStorage, setStorage } from '@/utils/storage';
import { POST_MESSAGE_TYPE, SEND_MESSAGE_TYPE } from '@/utils/webView/consts';
import dayjs from 'dayjs';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import * as TaskManager from 'expo-task-manager';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  Dimensions,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
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
const initialUrl = ENV.WEB_VIEW_URL + '/prepare-run';
function Index() {
  const insets = useSafeAreaInsets();
  const [webViewKey, setWebViewKey] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGpsInfoVisible, setIsGpsInfoVisible] = useState<boolean>(false);
  //TODO.. 위치 표시 UI 추가시 구현
  const [isGPSEnabled, setIsGPSEnabled] = useState<
    'granted' | 'waiting' | 'denied'
  >('waiting');

  const { webviewRef, postMessage } = useWebView<
    RunningData | { type: string; lat: number; lng: number } | string
  >();

  const setGpsStatus = async () => {
    const providerStatus = await Location.getProviderStatusAsync();
    setIsGpsInfoVisible(providerStatus.locationServicesEnabled);
    setIsGPSEnabled(
      providerStatus.locationServicesEnabled ? 'granted' : 'denied'
    );
  };

  const getLocation = async () => {
    return Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low
    });
  };

  const postGeoLocation = async () => {
    setIsRunning(true);

    const saveLocation = async () => {
      try {
        const runningData =
          (await getStorage<RunningData[]>(STORAGE_KEY.RUNNING_DATA)) || [];
        const location = await getLocation();
        setGpsStatus();
        const { latitude, longitude } = location.coords;

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
      saveLocation();
      const id = setInterval(saveLocation, INTERVAL_TIME);
      setIntervalId(id);
    }
  };

  const receiveMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data)
    switch (data.type) {
      case SEND_MESSAGE_TYPE.RUNNING_START:
        setIsRunning(true);
        postGeoLocation();
        break;
      case SEND_MESSAGE_TYPE.RUNNING_PAUSE:
        if (intervalId) clearInterval(intervalId);
        setIntervalId(null);
        setIsRunning(false);
        stopBackgroundLocation();
        break;
      case SEND_MESSAGE_TYPE.RUNNING_END:
        setIsGpsInfoVisible(false);
        if (intervalId) clearInterval(intervalId);
        setIntervalId(null);
        setIsRunning(false);
        stopBackgroundLocation();
        //TODO.. 운동 종료 로직 추가
        setStorage(STORAGE_KEY.RUNNING_DATA, []);
        setStorage(STORAGE_KEY.RUNNING_PENDING_MESSAGES, []);
        break;
      case MODULE.PUSH:
        const { type, data } = JSON.parse(event.nativeEvent.data);
        if (type === MODULE.PUSH) {
          setWebViewKey(prev => prev + 1);
          router.push(JSON.parse(data).url);
        }
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
      setGpsStatus();
    };
    init();
  }, []);

  const onLoadEnd = async () => {
    const location = await getLocation();
    const { latitude, longitude } = location.coords;
    setIsLoading(false);
    postMessage(POST_MESSAGE_TYPE.MESSAGE, {
      type: SEND_MESSAGE_TYPE.RUNNING_PREPARE,
      lat: latitude,
      lng: longitude
    });
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-between relative">
      {isGpsInfoVisible && (
        <GpsInfoChip
          isGPSEnabled={isGPSEnabled}
          style={[{ top: insets.top + 30 }]}
        />
      )}
      {isLoading && (
        <ActivityIndicator
          color="#32FF76"
          className="flex-1 justify-center items-center"
          style={[{ height: windowHeight }]}
        />
      )}
      <WebView
        ref={webviewRef}
        key={webViewKey}
        className="flex-1 bg-gray"
        onMessage={receiveMessage}
        onLoadEnd={onLoadEnd}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode={'never'}
        style={[styles.webview, { opacity: isLoading ? 0 : 1 }]}
        source={{
          uri: initialUrl
        }}
        mixedContentMode="always" // HTTP 리소스 허용
      />
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  webview: {
    width: windowWidth,
    height: windowHeight
  }
});
