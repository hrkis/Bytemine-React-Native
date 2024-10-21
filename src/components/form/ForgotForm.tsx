import { View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { forgotSchema } from '../../utils/schema';
import { AppTextInput, NextButton, ValidatedButton } from '..';
import { loginStyles } from '../../assets/styles';
import { sendEmailOtp, verifyEmailOtp } from '../../services/authService';
import { showToast } from '../../utils/alert';
import { navigate } from '../../utils/navigation';
import { ScreenNames } from '../../navigator/ScreenNames';

const ForgotForm = () => {

  const [showOtp, setshowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const onSubmit = (values: any) => {
    setLoading(true);
    if (!showOtp) {
      // call the send_email_otp_api
      sendEmailOtp(values)
        .then((res: any) => {
          setLoading(false);
          if (res?.success) {
            showToast(res?.message, 'success');
            setshowOtp(true);
          } else showToast(res?.message, 'error');
        })
        .catch(err => console.log(err));
    } else {
      // verify otp api call
      verifyEmailOtp({ otp, email: values?.email })
        .then((res: any) => {
          setLoading(false);
          if (res?.success) {
            showToast(res?.message, 'success');
            navigate(ScreenNames.RESET_SCREEN, {
              email: values?.email
            });
          } else showToast(res?.message, 'error');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={values => onSubmit(values)}
      validationSchema={forgotSchema}>
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <>
          <AppTextInput
            label="Email"
            value={values.email}
            error={touched.email && errors.email}
            onChangeText={handleChange('email')}
            placeholder="xyz@example.com"
          />

          {showOtp ? (
            <AppTextInput
              label="Enter OTP"
              placeholder="******"
              type="otp"
              setOtp={setOtp}
            />
          ) : (
            <View style={{ marginVertical: 30 }} />
          )}

          <View style={loginStyles.buttonContainer}>
            {loading ? (
              <ValidatedButton />
            ) : (
              <NextButton onPress={handleSubmit} />
            )}
          </View>
        </>
      )}
    </Formik>
  );
};

export default ForgotForm;
