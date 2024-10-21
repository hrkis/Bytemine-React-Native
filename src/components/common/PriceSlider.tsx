import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../utils/colors';
import normalize from 'react-native-normalize';
import { P } from './Text';

const PriceSlider = ({ value, setValue, balance, disabled }: {
  value: number; setValue: any; balance?: any; disabled?: any;
}) => {
  return (
    <View style={styles.conatiner}>
      <P style={{
        marginTop: normalize(10),
        marginRight: normalize(10),
        color: Colors.darkGrey,
      }}>$1</P>
      <Slider
        containerStyle={styles.sliderContainer}
        value={value}
        disabled={disabled}
        onValueChange={(value: any) => setValue(Math.round(value[0]))}
        maximumValue={balance}
        renderThumbComponent={() => (
          <View style={styles.pointerContainer}>
            <FastImage
              source={require('../../assets/images/pointer.png')}
              style={styles.pointer}
            />
            <Text style={[styles.value, {
              marginLeft: value.toString()?.length > 3 ? normalize(-20) : 0,
            }]}>${Math.round(value)}</Text>
          </View>
        )}
        maximumTrackTintColor={Colors.grey}
        minimumTrackTintColor={'#55e65e'}
        trackStyle={{ height: normalize(25), borderRadius: normalize(10) }}
      />
      <P style={{
        marginTop: normalize(10),
        marginLeft: normalize(10),
        color: Colors.darkGrey,
      }}>{`$${Math.round(balance)}`}</P>
    </View>
  );
};

export default PriceSlider;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sliderContainer: {
    width: '70%',
    marginBottom: normalize(20)
  },
  value: {
    marginTop: normalize(5),
    color: Colors.darkGreen,
    fontWeight: '600'
  },
  pointerContainer: {
    position: 'absolute',
    top: normalize(10),
    left: normalize(-7),
  },
  pointer: {
    width: normalize(15),
    height: normalize(9)
  }
});
