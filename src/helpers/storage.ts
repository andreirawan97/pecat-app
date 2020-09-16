import AsyncStorage from '@react-native-community/async-storage';

export async function getFromStorage(key: string) {
  return await AsyncStorage.getItem(key);
}

export async function setToStorage(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}
