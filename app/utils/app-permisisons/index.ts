import * as Location from 'expo-location';
//위치 권한 메서드
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
      throw new Error('위치 권한이 필요합니다');
    }
  } catch (error) {
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

export { getGeoLocationPermission, getBackgroundLocationPermission };
