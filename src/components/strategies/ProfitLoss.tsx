import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import MaterialCommunityicons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../utils/colors';
import {fixedToTwo, numberWithCommas} from '../../utils/common';
import BorderContainer from '../common/BorderContainer';

const ProfitLoss = ({stats}: {stats: any; style?: any; titleStyle?: any}) => {
  return (
    <>
      <BorderContainer type="profit">
        <View style={styles.row}>
          <Text style={{color: Colors.green}}>Total Profit</Text>
          <View style={styles.row}>
            <Text style={styles.price}>
              $
              {numberWithCommas(
                fixedToTwo(Math.round(stats?.profit * 100) / 100),
              )}
            </Text>
            <MaterialCommunityicons
              name="arrow-up-circle"
              color={Colors.darkGreen}
              size={normalize(16)}
            />
          </View>
        </View>
      </BorderContainer>
      <BorderContainer type="loss">
        <View style={styles.row}>
          <Text style={{color: Colors.red}}>Total Loss</Text>
          <View style={styles.row}>
            <Text style={styles.price}>
              $
              {numberWithCommas(
                fixedToTwo(Math.round(stats?.loss * 100) / 100),
              )}
            </Text>
            <MaterialCommunityicons
              name="arrow-down-circle"
              color={Colors.red}
              size={normalize(16)}
            />
          </View>
        </View>
      </BorderContainer>
    </>
  );
};

export default ProfitLoss;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  price: {
    color: Colors.black,
    fontWeight: '500',
    marginRight: normalize(3),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
