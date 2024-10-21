import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {P, H2} from '../../components';
import normalize from 'react-native-normalize';
import {Colors} from '../../utils/colors';

const WinLevel = ({
  win,
  color,
  level,
}: {
  win: number;
  color: any;
  level: number;
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <View
          style={[
            styles.common,
            styles.one,
            {backgroundColor: level >= 1 ? color : Colors.grey},
          ]}
        />
        <View
          style={[
            styles.common,
            styles.two,
            {backgroundColor: level >= 2 ? color : Colors.grey},
          ]}
        />
        <View
          style={[
            styles.common,
            styles.three,
            {backgroundColor: level >= 3 ? color : Colors.grey},
          ]}
        />
        <View
          style={[
            styles.common,
            styles.four,
            {backgroundColor: level >= 4 ? color : Colors.grey},
          ]}
        />
      </View>
      <View style={{marginLeft: normalize(5)}}>
        <P style={styles.label}>Avg. Win%</P>
        <H2 style={[styles.winText, {color}]}>{`${
          win?.toFixed(1) ?? '_'
        }%`}</H2>
      </View>
    </View>
  );
};

export default WinLevel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  winText: {
    fontSize: normalize(14),
    fontWeight: '600',
  },
  label: {
    color: Colors.black,
    fontSize: normalize(7),
  },
  common: {
    width: normalize(6),
    backgroundColor: Colors.grey,
    marginLeft: normalize(3),
  },

  one: {
    height: normalize(12),
  },
  two: {
    height: normalize(16),
  },
  three: {
    height: normalize(20),
  },
  four: {
    height: normalize(24),
  },
});
