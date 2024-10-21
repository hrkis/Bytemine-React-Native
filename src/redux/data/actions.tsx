import store from '../store';
import {
  SET_BALANCE,
  SET_FIRST,
  SET_MODAL,
  SET_NOTIFICATION,
  SET_REF,
  SET_SPLASH_DATA,
  SET_STATS,
  SET_SYMBOL_IMAGE,
  SET_TOKEN,
  SET_UPDATE_DATA,
  SET_USER,
  SET_LIVE_MODE,
  SET_AVERAGE_MATRICS,
  SET_IS_FIRST_TIME
} from './constants';

export const setUser = (user: any) => {
  store.dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const setToken = (token: string) => {
  store.dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const setStats = (stats: any) => {
  store.dispatch({
    type: SET_STATS,
    payload: stats,
  });
};

export const setModal = (show: boolean) => {
  store.dispatch({
    type: SET_MODAL,
    payload: show,
  });
};

export const setBalance = (val: number) => {
  store.dispatch({
    type: SET_BALANCE,
    payload: val,
  });
};

export const setRef = (val: number) => {
  store.dispatch({
    type: SET_REF,
    payload: val,
  });
};

export const setFirst = (val: boolean) => {
  store.dispatch({
    type: SET_FIRST,
    payload: val,
  });
};

export const setAllowNotification = (val: boolean) => {
  store.dispatch({
    type: SET_NOTIFICATION,
    payload: val,
  });
};

export const setUpdateTableData = (val: any) => {
  store.dispatch({
    type: SET_UPDATE_DATA,
    payload: val,
  });
};

export const setSplashData = (val: any) => {
  store.dispatch({
    type: SET_SPLASH_DATA,
    payload: val,
  });
};

export const setSymbolImage = (val: any) => {
  store.dispatch({
    type: SET_SYMBOL_IMAGE,
    payload: val,
  });
};

export const setLiveMode = (liveMode: boolean) => {
  store.dispatch({
    type: SET_LIVE_MODE,
    payload: liveMode,
  });
};

export const setAverageMatrics = (val: any) => {
  store.dispatch({
    type: SET_AVERAGE_MATRICS,
    payload: val,
  });
};

export const setIsFirstTime = (val: any) => {
  store.dispatch({
    type: SET_IS_FIRST_TIME,
    payload: val,
  });
};
