import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

import {Container, H1} from '../../components';
import {loginStyles} from '../../assets/styles';
import {ForgotForm} from '../../components';
import {goBack} from '../../utils/navigation';
import normalize from 'react-native-normalize';
import {Colors} from '../../utils/colors';

const Forgot = () => {
  return (
    <Container style={loginStyles.container}>
      <View style={loginStyles.logoContainer}>
        <TouchableOpacity onPress={goBack} style={{marginLeft: -normalize(15)}}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={normalize(45)}
            color={Colors.darkGrey}
          />
        </TouchableOpacity>
        <FastImage
          source={require('../../assets/images/mktdynamicLogo.png')}
          resizeMode="contain"
          style={loginStyles.logo2}
        />
      </View>
      <H1>Forgot Password</H1>
      <View style={loginStyles.gap} />
      <ForgotForm />
    </Container>
  );
};

export default Forgot;
