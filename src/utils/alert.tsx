import Toast from 'react-native-toast-message';

export const showToast = (message: string, type: string) => {
  message &&
    Toast.show({
      type,
      text1: 'Market Dynamics',
      text2: message,
    });
};
