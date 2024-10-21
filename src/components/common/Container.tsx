import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors';

const Container = ({children, style, containerStyle}: any) => {
  return (
    <SafeAreaView style={containerStyle ? containerStyle : styles.container}>
      <View style={[style ? style : {paddingHorizontal: 15}]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

export default Container;
