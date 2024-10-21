import {Dimensions, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {Colors} from '../../../utils/colors';

export const loginStyles = StyleSheet.create({
  container: {
    width: '85%',
    height: '100%',
  },
  logoContainer: {
    height: normalize(38),
    flexDirection: 'row',
    marginTop: normalize(60),
    marginBottom: normalize(120),
    // width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo2: {
    height: normalize(38),
    width: '60%',
    marginRight: '18%',
  },
  logo: {
    marginTop: normalize(60),
    marginBottom: normalize(120),
    height: normalize(38),
  },
  gap: {
    marginVertical: normalize(15),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  or: {
    alignSelf: 'center',
    marginVertical: normalize(15),
  },
  socialContainer: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: normalize(50),
    // position: 'absolute',
    // bottom: normalize(50),
    // left: normalize((Dimensions.get('window').width * 0.7) / 2 - 30),
  },

  otpfield: {
    backgroundColor: Colors.grey,
    borderRadius: normalize(10),
    color: Colors.darkGrey,
    fontSize: normalize(18),
    borderWidth: 0,
  },
  otpHighlight: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    color: Colors.darkGrey,
  },
});
