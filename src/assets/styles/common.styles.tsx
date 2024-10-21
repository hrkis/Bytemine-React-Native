import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {Colors} from '../../utils/colors';

export const commonStyles = StyleSheet.create({
  h2: {
    fontSize: normalize(20),
    color: Colors.black,
    // fontFamily: 'Roboto',
  },
  h1: {
    fontSize: normalize(30),
    color: Colors.black,
    // fontFamily: 'Roboto',
  },
  p: {
    fontSize: normalize(15),
    color: Colors.darkestGrey,
  },
  orderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10),
    backgroundColor: Colors.red,
    paddingHorizontal: normalize(-10),
    borderBottomLeftRadius: normalize(15),
    borderBottomRightRadius: normalize(15),
    width: '100%',
    paddingVertical: normalize(10),
  },
  order: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: normalize(15),
  },

  prevBtn: {
    position: 'absolute',
    bottom: normalize(15),
  },
});
