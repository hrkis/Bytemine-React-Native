import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import normalize from 'react-native-normalize';
import {loginStyles} from '../../assets/styles';

const OTP = ({onFilled}: {onFilled?: any}) => {
  return (
    <OTPInputView
      style={{width: '100%', height: normalize(45)}}
      pinCount={6}
      codeInputFieldStyle={loginStyles.otpfield}
      codeInputHighlightStyle={loginStyles.otpHighlight}
      onCodeFilled={onFilled}
    />
  );
};

export default OTP;
