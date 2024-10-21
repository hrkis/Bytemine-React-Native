import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {Colors} from '../../utils/colors';
import normalize from 'react-native-normalize';

export const NextButton = ({onPress}: {onPress?: () => void}) => (
  <TouchableOpacity onPress={onPress} style={[styles.circle, styles.next]}>
    <MaterialCommunityIcons
      name="chevron-right"
      size={normalize(60)}
      color={Colors.white}
    />
  </TouchableOpacity>
);

export const ValidatedButton = ({onPress}: {onPress?: () => void}) => (
  <TouchableOpacity onPress={onPress} style={[styles.circle, styles.validated]}>
    <MaterialCommunityIcons
      name="check"
      size={normalize(55)}
      color={Colors.white}
    />
  </TouchableOpacity>
);

export const GoogleButton = ({onPress}: {onPress?: () => void}) => (
  <TouchableOpacity onPress={onPress} style={styles.social}>
    <Ionicons name="logo-google" size={normalize(26)} color={Colors.white} />
  </TouchableOpacity>
);

export const LinkedInButton = ({onPress}: {onPress?: () => void}) => (
  <TouchableOpacity onPress={onPress} style={styles.social}>
    <EntypoIcons name="linkedin" size={normalize(20)} color={Colors.white} />
  </TouchableOpacity>
);

export const AppleButton = ({onPress}: {onPress?: () => void}) => (
  <TouchableOpacity onPress={onPress} style={styles.social}>
    <MaterialCommunityIcons
      name="apple"
      size={normalize(23)}
      color={Colors.white}
    />
  </TouchableOpacity>
);

export const AppButton = ({
  onPress,
  text,
  style,
}: {
  onPress: any;
  text?: string;
  style?: any;
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.appbutton, style]}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export const PrevButton = ({
  onPress,
  style,
}: {
  onPress?: () => void;
  style?: any;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.smallcircle, styles.next, style]}>
    <MaterialCommunityIcons
      name="chevron-left"
      size={normalize(45)}
      color={Colors.white}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  circle: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallcircle: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  next: {
    backgroundColor: Colors.red,
  },
  validated: {
    backgroundColor: Colors.green,
  },
  social: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  appbutton: {
    backgroundColor: Colors.red,
    paddingVertical: normalize(13),
    paddingHorizontal: normalize(25),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopEndRadius: normalize(10),
    borderBottomEndRadius: normalize(10),
    borderTopStartRadius: normalize(10),
    borderBottomStartRadius: normalize(10),
  },
  text: {
    color: Colors.white,
    fontSize: Platform.OS === 'ios' ? normalize(13) : normalize(15),
    fontWeight: '500',
    textAlign: 'center',
  },
});
