import { apiConstants } from '../utils/apiConstants';
import { postRequest } from './api';

export const loginService = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      let headers = {
        'Content-Type': 'multipart/form-data'
      }

      let res = await postRequest(apiConstants.LOGIN, formData, headers);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const changeProfileService = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_id', data.user_id);
      formData.append('file', data.file);

      let res = await postRequest(`upload_profile_image`, formData);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const storeTokenService = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_id', data?.user_id ?? data?.u_id);
      formData.append('token', data.token);

      let res = await postRequest(`store_fcm_token`, formData);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getRecentTokenService = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_id', data?.user_id ?? data?.u_id);

      let res = await postRequest(`get_recent_fcm_token`, formData, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const sendEmailOtp = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);

      let res = await postRequest(`send_email_otp`, formData, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const verifyEmailOtp = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('otp', data.otp);
      formData.append('email', data.email);

      let res = await postRequest(`verify_email_otp`, formData, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const resetPassword = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirm_password', data.passwordConfirmation);

      let res = await postRequest(`reset_password`, formData, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const loginWithEmail = (email: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('email', email);

      let res = await postRequest(apiConstants.SOCIAL_LOGIN, formData, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateTableNotification = (user_id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_id', user_id);

      let res = await postRequest(
        `get_latest_order_book_notifications`,
        formData,
        {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      );

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
