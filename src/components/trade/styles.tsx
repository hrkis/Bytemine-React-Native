import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {Colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    position: 'absolute',
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: normalize(30),
    // color: Colors.red,
    // fontSize: normalize(15),
  },
  title2: {
    marginBottom: normalize(30),
    color: Colors.darkestGrey,
    fontWeight: '600',
    fontSize: normalize(15),
  },
  title3: {fontSize: normalize(12), color: Colors.black},
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: normalize(30),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  redText: {
    textAlign: 'center',
    fontSize: normalize(35),
    color: Colors.red,
  },
  smallHeader: {
    fontSize: normalize(10),
    fontWeight: '600',
    color: Colors.black,
    marginBottom: normalize(20),
  },
  smallText: {
    fontSize: normalize(10),
    fontWeight: '400',
    color: Colors.black,
  },
  price: {
    color: Colors.black,
    fontWeight: '500',
    marginRight: normalize(3),
  },
});
