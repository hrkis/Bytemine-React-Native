import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, H1, PrevButton, ResetForm} from '../../components';
import {loginStyles} from '../../assets/styles';
import {goBack} from '../../utils/navigation';
import {Colors} from '../../utils/colors';
import normalize from 'react-native-normalize';

const Reset = ({
  route: {
    params: {email, account},
  },
}: any) => {
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
      <H1>Reset Password</H1>
      <View style={loginStyles.gap} />
      <ResetForm email={email} account={account} />
    </Container>
  );
};

export default Reset;
