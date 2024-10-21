import { apiConstants } from '../utils/apiConstants';
import { getRequest, postRequest } from './api';

export const getStrategiesListData = (
  user_id: string,
  filter: string,
  next_offset: number,
  search_string?: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        user_id: user_id,
        search_string: search_string ? search_string : '',
        filter: filter.toLowerCase()
      }
      const url = next_offset ? apiConstants.SEARCH_STRATEGY + '/' + next_offset.toString()
        : apiConstants.SEARCH_STRATEGY
      let res = await postRequest(url, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const forwardTestOrderBook = (strategy_id: string, next_offset: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        strategy_id: strategy_id
      }
      const url = next_offset ? apiConstants.VIEW_VIRTUAL_ORDER_BOOK + '/' + next_offset.toString()
        : apiConstants.VIEW_VIRTUAL_ORDER_BOOK
      let res = await postRequest(url, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getVirtualWalletDetails = (user_id: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        "user_id": user_id
      }
      let res = await postRequest(apiConstants.VIRTUAL_WALLET_DETAILS, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const deployStrategy = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        "strategy_id": data.strategy_id,
        "user_id": data.user_id,
        "amount": data.amount
      }
      let res = await postRequest(apiConstants.DEPLOY_STRATEGY, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const unDeployStrategy = (strategy_id: string, user_id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        strategy_id: strategy_id,
        user_id: user_id
      }
      let res = await postRequest(apiConstants.UNDEPLOY_STRATEGY, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getWalletDetails = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_id', data?.user_id ?? data?.u_id);

      let res = await postRequest(`get_virtual_wallet_details`, formData);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getGlobalOrderBook = (user_id: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_id', user_id);

      let res = await postRequest(`get_global_order_book_data`, formData);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const rechargeVirtualFunds = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_id', data?.user_id ?? data?.u_id);

      let res = await postRequest(`recharge_virtual_funds`, formData);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAggregatedStats = (user_id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        user_id: user_id
      }
      let res = await postRequest(apiConstants.GET_AGGREGATED_TESTS, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getReferLink = (user_id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_id', user_id);

      let res = await postRequest(`refer_a_friend`, formData);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getEmailPrefrences = (user_id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        "user_id": user_id,
      }
      let res = await postRequest(apiConstants.GET_EMAIL_PREFERENCES, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const setEmailPrefrences = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        "user_id": data?.user_id,
        "id": data?.id,
        "option": data?.option
      }
      let res = await postRequest(apiConstants.SET_EMAIL_PREFERENCES, params);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getMenuPrefs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await getRequest(`extra_menu_mobile_app`);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getStockLogo = (symbol: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('symbol', symbol);

      let res = await postRequest(`get_stock_logo`, formData);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAverageMatrics = (strategy_ids: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let params = {
        strategy_ids: strategy_ids.toString()
      }
      let res = await postRequest(apiConstants.GET_AVERAGE_MATRICS, params)
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const saveAddons = (dataObj: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await postRequest(apiConstants.SAVE_ADDONS, JSON.stringify(dataObj));
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllBrokers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await getRequest(apiConstants.GET_ALL_BROKERS);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const saveApiKeys = (dataObj: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await postRequest(apiConstants.SAVE_API_KEYS, dataObj);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const deployStrategyLiveApi = (dataObj: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await postRequest(apiConstants.DEPLOY_STRTEGY_LIVE, dataObj);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
