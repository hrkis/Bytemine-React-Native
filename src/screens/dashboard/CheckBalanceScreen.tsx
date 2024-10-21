import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Container, Header} from '../../components';
import {strategyStyles} from '../../assets/styles';

const CheckBalanceScreen = () => {
  return (
    <Container
      containerStyle={strategyStyles.container}
      style={strategyStyles.innerContainer}>
      <Header style={{width: '90%'}} order={true} />
    </Container>
  );
};

export default CheckBalanceScreen;

const styles = StyleSheet.create({});
