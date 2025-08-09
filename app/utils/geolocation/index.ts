const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInMeters = (
  startLatitude: number,
  startLongitude: number,
  endLatitude: number,
  endLongitude: number
): number => {
  const R = 6371; // 지구 반지름 (단위: km)
  const dLat = deg2rad(endLatitude - startLatitude);
  const dLon = deg2rad(endLongitude - startLongitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(startLatitude)) *
      Math.cos(deg2rad(endLatitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // 결과 단위: m
};

const getCurrentSpeed = (distance: number, time: number): number => {
  return Math.round((distance / time) * 100) / 100;
};

export { getDistanceFromLatLonInMeters, getCurrentSpeed };
