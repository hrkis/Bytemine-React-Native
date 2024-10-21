import {View, Text, Linking} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import {AppButton, P} from '..';

const EmptyStrategy = () => {
  return (
    <View
      style={{
        marginTop: normalize(55),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <P
        style={{
          marginBottom: normalize(15),
          textAlign: 'center',
          marginHorizontal: normalize(30),
        }}>
        To create strategies, head to our website and log into the web app
      </P>
      <AppButton
        text="Go to Website"
        onPress={() => Linking.openURL('https://www.mktdynamics.com/')}
      />
    </View>
  );
};

export default EmptyStrategy;
