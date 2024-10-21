import {Dimensions} from 'react-native';
import normalize from 'react-native-normalize';

export const common = {
  ScreenWidth: normalize(Dimensions.get('window').width),
  ScreenHeight: normalize(Dimensions.get('window').height),

  BASE_URL: 'http://app.mktdynamics.com/',
};

export function numberWithCommas(x: number) {
  // return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  return x.toLocaleString('en-US');
}

export function fixedToTwo(x: any): any {
  return Number(+x).toFixed(2);
}
