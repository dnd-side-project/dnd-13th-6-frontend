import * as Location from 'expo-location';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

//위치 권한 메서드
const getGeoLocationPermission = async () => {
  try {
    let { status: foregroundPermission } =
      await Location.requestForegroundPermissionsAsync();
    console.log(foregroundPermission);
    if (foregroundPermission !== 'granted') {
      throw new Error('위치 권한이 필요합니다');
    }
  } catch (error) {
    console.log('hihi');
    console.log('error', error);
    throw new Error('위치 권한 확인 중 오류가 발생했습니다.');
  }
};

const getBackgroundLocationPermission = async () => {
  const { status: backgroundStatus } =
    await Location.requestBackgroundPermissionsAsync();
  console.log('backgroundStatus', backgroundStatus);
  if (backgroundStatus !== 'granted') {
    throw new Error('백그라운드 권한이 필요합니다');
  }
};

async function registerForPushNotificationsAsync() {
  if (!Constants.isDevice) {
    console.log('실제 기기에서만 작동합니다.');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('푸시 알림 권한이 필요합니다.');
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX
    });
  }

  // Expo SDK 53에서 FCM 토큰 발급
  const token = (await Notifications.getDevicePushTokenAsync()).data;
  console.log('FCM Token:', token);
  return token;
}

export {
  getGeoLocationPermission,
  getBackgroundLocationPermission,
  registerForPushNotificationsAsync
};
