import { apiConstants } from '../utils/apiConstants';
import { postRequest } from './api';

export const getForkableStrategies = (user_id: string, next_offset: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        user_id: user_id
      }
      const url = next_offset ? apiConstants.GET_FORK_STRATEGIES + '/' + next_offset.toString()
        : apiConstants.GET_FORK_STRATEGIES
      let res = await postRequest(url, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCopiableStrategies = (user_id: string, next_offset: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        user_id: user_id
      }
      const url = next_offset ? apiConstants.GET_COPY_STRATEGIES + '/' + next_offset.toString()
        : apiConstants.GET_COPY_STRATEGIES
      let res = await postRequest(url, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const forkStrategy = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('marketplace_id', data?.marketplace_id);
      formData.append('strategy_id', data?.strategy_id);
      formData.append('user_id', data?.user_id ?? data?.u_id);

      console.log('formData', formData);

      let res = await postRequest(`fork_strategy`, formData);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const copyStrategy = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('marketplace_id', data?.marketplace_id);
      formData.append('strategy_id', data?.strategy_id);
      formData.append('user_id', data?.user_id ?? data?.u_id);

      let res = await postRequest(`copy_strategy`, formData);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
