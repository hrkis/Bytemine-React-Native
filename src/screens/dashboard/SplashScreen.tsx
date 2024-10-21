import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import normalize from 'react-native-normalize';
import { useSelector } from 'react-redux';
import { strategyStyles } from '../../assets/styles';
import { Container, H2, NextButton, P } from '../../components';
import { ScreenNames } from '../../navigator/ScreenNames';
import { Colors } from '../../utils/colors';
import { common } from '../../utils/common';
import { navigate } from '../../utils/navigation';

const SplashScreen = () => {

  const splashData = useSelector((state: any) => state?.splash)

  return (
    <Container
      containerStyle={[strategyStyles.container]}
      style={[strategyStyles.innerContainer, styles.container]}>
      <View>
        <View style={styles.labelContainer}>
          <P style={styles.label}>{splashData?.label}</P>
        </View>
        <H2 style={{ fontWeight: '600' }}>{splashData?.heading}</H2>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(splashData?.link)}>
        <FastImage
          source={{ uri: splashData?.img_url }}
          style={{ width: common.ScreenWidth * 0.6, height: normalize(250) }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={{ marginBottom: normalize(20) }} />
      <NextButton onPress={() => navigate(ScreenNames.TAB_SCREEN)} />
      {/* <H2 style={styles.name}>{name}</H2> */}
    </Container>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: Colors.red,
    fontSize: 30,
  },
  labelContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffb347',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    color: Colors.black,
    fontSize: 12
  }
})
