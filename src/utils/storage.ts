import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveJSON = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const loadJSON = async (key: string) => {
  const s = await AsyncStorage.getItem(key);
  return s ? JSON.parse(s) : null;
};

export const removeKey = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
