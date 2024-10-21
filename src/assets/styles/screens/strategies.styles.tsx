import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {Colors} from '../../../utils/colors';

export const strategyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  orderContainer: {
    marginTop: normalize(20),
    width: '100%',
    height: '70%',
    paddingHorizontal: normalize(15),
  },
  deployContainer: {
    width: '100%',
    paddingHorizontal: normalize(15),
    marginTop: normalize(35),
  },
});
