import AsyncStorage from '@react-native-async-storage/async-storage';

enum STORAGE_KEY {
  RUNNING_DATA = 'runningData'
}

const getStorage = async <T>(key: STORAGE_KEY): Promise<T | null> => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const setStorage = async <T>(key: STORAGE_KEY, value: T) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export { STORAGE_KEY, getStorage, setStorage };
