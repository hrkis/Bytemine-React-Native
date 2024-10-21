import { View, StyleSheet } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import LoadingDots from 'react-native-loading-dots';
import { Colors } from '../../utils/colors';

const Loader = ({ style }: { style?: any }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{ width: normalize(90) }}>
        <LoadingDots
          bounceHeight={10}
          colors={[
            Colors.grey,
            Colors.darkGrey,
            Colors.darkestGrey,
            Colors.black,
          ]}
        />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
