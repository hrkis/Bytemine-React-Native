import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTP from '../auth/OTP';
import normalize from 'react-native-normalize';

const AppTextInput = ({
  label,
  value,
  type,
  placeholder,
  error,
  onChangeText,
  setOtp,
  onSearchPress,
  multiline,
}: {
  label?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  error?: any;
  onChangeText?: any;
  setOtp?: any;
  onSearchPress?: any;
  multiline?: boolean;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.mainContainer}>
      {label ? <Text style={styles.label}>{label}</Text>
        : null}
      {type === 'otp' ? (
        <OTP onFilled={(code: any) => setOtp(code)} />
      ) : (
        <View
          style={
            error
              ? [styles.container, styles.error]
              : [
                styles.container,
                {
                  borderRadius:
                    type === 'search' ? normalize(30) : normalize(10),
                },
              ]
          }>
          <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor={Colors.darkGrey}
            textAlign={'center'}
            secureTextEntry={type === 'password' ? !visible : visible}
            onChangeText={onChangeText}
            autoCapitalize="none"
            style={[styles.input, { maxWidth: type == 'search' ? '85%' : '100%' }]}
            multiline={multiline}
            keyboardType={type == 'number' ? 'numeric' : 'default'}
          />
          {type === 'password' && (
            <TouchableOpacity
              style={styles.eye}
              onPress={() => setVisible(!visible)}>
              <MaterialCommunityIcons
                name={visible ? 'eye-off' : 'eye'}
                color={Colors.darkGrey}
                size={18}
              />
            </TouchableOpacity>
          )}
          {type === 'search' && (
            <TouchableOpacity onPress={onSearchPress} style={styles.eye}>
              <Ionicons
                style={{ transform: [{ rotateY: '180deg' }], marginRight: normalize(10) }}
                name="md-search-outline"
                color={Colors.darkGrey}
                size={20}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 0 : 12,
    borderRadius: 10,
  },
  mainContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: Colors.black,
    fontSize: normalize(15),
  },
  eye: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        right: 10,
        top: '60%',
      },
      android: {
        position: 'absolute',
        right: 10,
        top: '32%',
      },
    }),
  },
  error: {
    borderWidth: 1,
    borderColor: Colors.red,
  },
  input: {
    color: Colors.black,
  },
});

export default AppTextInput;
