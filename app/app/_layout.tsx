import { useColorScheme } from '@/hooks/useColorScheme';
import {
  getBackgroundLocationPermission,
  getGeoLocationPermission,
  registerForPushNotificationsAsync
} from '@/utils/app/permission';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { Asset } from 'expo-asset';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import { ToastProvider } from '@/contexts/ToastContext';
import ToastContainer from '@/components/ToastContainer';
import * as Device from 'expo-device';
import 'react-native-reanimated';
import './global.css';
import { ENV } from '@/utils/app/consts';

SplashScreen.preventAutoHideAsync();

function AnimatedSplashScreen({
  children,
  image
}: {
  children: React.ReactNode;
  image: number;
}) {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  async function onFetchUpdateAsync() {
    try {
      if (!__DEV__) {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          Alert.alert('Update available', 'Please update your app', [
            {
              text: 'Update',
              onPress: () => Updates.reloadAsync()
            },
            { text: 'Cancel', style: 'cancel' }
          ]);
        }
      }
    } catch (error) {
      console.error(error);
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  const onImageLoaded = async () => {
    try {
      // 데이터 준비
      await onFetchUpdateAsync();
      await SplashScreen.hideAsync();
    } catch (e) {
      console.error(e);
    } finally {
      setAppReady(true);
    }
  };

  useEffect(() => {
    if (expoPushToken && Device.isDevice) {
      Alert.alert('sendPushNotification', expoPushToken);
    }
  }, [expoPushToken]);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                Constants.expoConfig?.splash?.backgroundColor || '#000'
            }
          ]}
        >
          <Animated.Image
            source={image}
            style={{
              resizeMode: Constants.expoConfig?.splash?.resizeMode || 'contain',
              width: Constants.expoConfig?.splash?.imageWidth || 200
            }}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

function AnimatedAppLoader({
  children,
  image
}: {
  children: React.ReactNode;
  image: number;
}) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.loadAsync(image);
      setSplashReady(true);
    }
    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });

  const [inited, setInited] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const splashOpacity = useRef(new Animated.Value(1)).current;

  // 권한 초기화
  useEffect(() => {
    const init = async () => {
      try {
        await getGeoLocationPermission();
        // await getBackgroundLocationPermission();
      } catch (error: unknown) {
        Alert.alert((error as Error).message);
      } finally {
        setInited(true);
      }

      Notifications.getDevicePushTokenAsync().then(token => {
        fetch(`${ENV.API_BASE_URL}/api/device-tokens`, {
          method: 'POST',
          body: JSON.stringify({
            token: token.data,
            deviceType: Platform.OS
          })
        });
      });

      const receivedSubscription =
        Notifications.addNotificationReceivedListener(notification => {
          console.log('알림 수신:', notification);
        });

      const responseSubscription =
        Notifications.addNotificationResponseReceivedListener(response => {
          console.log('알림 클릭:', response);
        });

      return () => {
        receivedSubscription.remove();
        responseSubscription.remove();
        Notifications.getDevicePushTokenAsync().then(token => {
          fetch(`${ENV.API_BASE_URL}/api/device-tokens`, {
            method: 'DELETE',
            body: JSON.stringify({
              token: token.data
            })
          });
        });
      };
    };
    init();
  }, []);
  // getGeoLocationPermission()x`
  // 준비 완료 시 네이티브 스플래시 숨기고 오버레이 페이드아웃
  useEffect(() => {
    const animateOut = async () => {
      if (!loaded || !inited) return;
      try {
        await SplashScreen.hideAsync();
      } catch {}
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true
      }).start(() => setShowSplash(false));
    };
    animateOut();
  }, [loaded, inited, splashOpacity]);

  return (
    <ToastProvider>
      <AnimatedAppLoader image={require('../assets/images/splash.png')}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ThemeProvider
              value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
            <ToastContainer />
          </BottomSheetModalProvider>

          {showSplash && (
            <Animated.View style={[styles.splash]}></Animated.View>
          )}
        </GestureHandlerRootView>
      </AnimatedAppLoader>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }
});
