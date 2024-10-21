import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Alert, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  setAllowNotification,
  setToken,
  setUpdateTableData,
} from '../redux/data/actions';
import store from '../redux/store';
import {
  getRecentTokenService,
  storeTokenService,
  updateTableNotification,
} from '../services/authService';
import {getData} from './storage';
import axios from 'axios';

export const configureNotification = () => {
  getData('notif')
    .then(res => {
      console.log('notif', res);
      if (res === 'disable') {
        setAllowNotification(false);
        disableNotifications();
      } else {
        setAllowNotification(true);
        enableNotifications();
      }
    })
    .catch(err => console.log(err));
};

export const disableNotifications = () => PushNotification.abandonPermissions();

const APNToFCM = async (apn: string): Promise<{token: string; os: string}> => {
  const data = JSON.stringify({
    application: 'com.bytemine',
    sandbox: __DEV__,
    apns_tokens: [apn],
  });
  const config = {
    method: 'post',
    url: 'https://iid.googleapis.com/iid/v1:batchImport',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'key=AAAAhUqV3wQ:APA91bGaDLki64zrZetmJ1yYsR4mHxSfj_4sS4VZepdiU6fMLcYEwKFfaGx-ICR8KzhCtnOaO9R9lbC-LY7bNi_MGuykWseSOByYFF6ApR2uIEdXW_UNaFirSFBJouilQKrpGX2mMEH2',
    },
    data: data,
  };
  let token = {token: '', os: 'ios'};
  try {
    const response = await axios(config);
    token.token = response.data?.results[0]?.registration_token;
  } catch (e) {
    console.log('token convert error ', e);
  }
  return token;
};

export const updateTable = () => {
  updateTableNotification(
    (store.getState()?.user as any)?.user_id ??
      (store.getState()?.user as any)?.u_id,
  )
    .then((res: any) => {
      if (res?.success) setUpdateTableData(res?.data);
    })
    .catch(err => console.log(err));
};

export const enableNotifications = () => {
  PushNotification.configure({
    onRegister: async function (token) {
      updateTable();
      const user_id =
        (store.getState()?.user as any)?.user_id ??
        (store.getState()?.user as any)?.u_id;
      console.log('TOKEN:', token, user_id);
      if (Platform.OS === 'ios') {
        token = await APNToFCM(token.token);
      }

      if (user_id) {
        getRecentTokenService({user_id})
          .then(async (data: any) => {
            console.log('datadata', data);
            if (!data?.success || token.token !== data?.fcm_key) {
              console.log('token--------', token);
              await storeTokenService({user_id, token: token?.token});
            }
            setToken(token?.token);
          })
          .catch(err => console.log(err));
      }
    },

    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      updateTable();
      // Alert.alert('test', JSON.stringify(notification));
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
};
