import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors';
import normalize from 'react-native-normalize';

const BorderContainer = ({children, type}: any) => {
  const getBorderColor = (type: string) => {
    switch (type) {
      case 'profit':
        return Colors.green;
      case 'loss':
        return Colors.red;
      default:
        return Colors.darkGrey;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'profit':
        return '#f6fbf7';
      case 'loss':
        return '#fef6f7';
      default:
        return Colors.white;
    }
  };

  return (
    <View
      style={{
        width: '100%',
        borderColor: getBorderColor(type),
        borderWidth: 0.6,
        borderRadius: normalize(5),
        backgroundColor: getBackgroundColor(type),
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(13),
        marginBottom: normalize(15),
      }}>
      {children}
    </View>
  );
};

export default BorderContainer;

const styles = StyleSheet.create({});
