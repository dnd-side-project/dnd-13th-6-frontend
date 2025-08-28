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
  const distance = R * c * 1000;
  return Math.round(distance * 10) / 10;
};

const getCurrentSpeed = (distance: number, time: number): number => {
  return Math.round((distance / time) * 10) / 10;
};

const getAvgSpped = (distance: number[], time: number): number => {
  const totalDistance = distance.reduce((acc, cur) => acc + cur, 0);
  return Math.round((totalDistance / time) * 10) / 10;
};

export { getDistanceFromLatLonInMeters, getCurrentSpeed, getAvgSpped };
