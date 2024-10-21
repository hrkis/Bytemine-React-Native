import {
  SET_AVERAGE_MATRICS,
  SET_BALANCE,
  SET_FIRST,
  SET_IS_FIRST_TIME,
  SET_LIVE_MODE,
  SET_MODAL,
  SET_NOTIFICATION,
  SET_REF,
  SET_SPLASH_DATA,
  SET_STATS,
  SET_SYMBOL_IMAGE,
  SET_TOKEN,
  SET_UPDATE_DATA,
  SET_USER,
} from './constants';

const initialState = {
  user: null,
  token: null,
  stats: null,
  show: false,
  balance: 0,
  ref: null,
  isfirst: false,
  allownotif: false,
  updatedata: [],
  splash: null,
  symbolImages: [],
  liveMode: false,
  averageMatrics: [],
  isFirstTime: true
};
const dataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_STATS:
      return { ...state, stats: action.payload };

    case SET_MODAL:
      return { ...state, show: action.payload };

    case SET_BALANCE:
      return { ...state, balance: action.payload };

    case SET_REF:
      return { ...state, ref: action.payload };

    case SET_FIRST:
      return { ...state, isfirst: action.payload };

    case SET_NOTIFICATION:
      return { ...state, allownotif: action.payload };

    case SET_UPDATE_DATA:
      return { ...state, updatedata: action.payload };

    case SET_SPLASH_DATA:
      return { ...state, splash: action.payload };

    case SET_SYMBOL_IMAGE:
      return {
        ...state,
        symbolImages: action.payload,
      };

    case SET_LIVE_MODE:
      return { ...state, liveMode: action.payload };

    case SET_AVERAGE_MATRICS:
      return {
        ...state,
        averageMatrics: action.payload,
      };

    case SET_IS_FIRST_TIME:
      return {
        ...state,
        isFirstTime: action.payload
      };

    default:
      return state;
  }
};
export default dataReducer;
