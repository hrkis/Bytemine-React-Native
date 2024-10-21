import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeData = (key: string) =>
  new Promise(resolve => {
    AsyncStorage.removeItem(key).then(
      res => resolve(res),
      err => resolve(null),
    );
  });

export const storeData = (key: string, value: any) =>
  new Promise(resolve => {
    AsyncStorage.setItem(key, value).then(
      res => resolve(res),
      err => resolve(null),
    );
  });

export const getData = (key: string) =>
  new Promise(resolve => {
    AsyncStorage.getItem(key).then(
      res => resolve(res),
      err => resolve(null),
    );
  });
