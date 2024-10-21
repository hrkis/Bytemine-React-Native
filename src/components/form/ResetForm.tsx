import { View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { resetSchema } from '../../utils/schema';
import { loginStyles } from '../../assets/styles';
import { resetPassword } from '../../services/authService';
import { showToast } from '../../utils/alert';
import { goBack, navigate } from '../../utils/navigation';
import { ScreenNames } from '../../navigator/ScreenNames';
import AppTextInput from '../common/TextInput';
import { NextButton, ValidatedButton } from '../common/Buttons';

const ResetForm = ({ email, account }: any) => {

  const [loading, setLoading] = useState(false);

  const onSubmit = (values: any) => {
    setLoading(true);
    resetPassword({ ...values, email })
      .then((res: any) => {
        setLoading(false);
        if (res?.success) {
          showToast(res?.message, 'success');
          account ? goBack() : navigate(ScreenNames.LOGIN_SCREEN);
        } else showToast(res?.message, 'error');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={{ password: '', passwordConfirmation: '' }}
      onSubmit={values => onSubmit(values)}
      validationSchema={resetSchema}>
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <>
          <AppTextInput
            label="Reset Password"
            placeholder="******"
            value={values.password}
            error={touched.password && errors.password}
            onChangeText={handleChange('password')}
            type="password"
          />
          <AppTextInput
            label="Confirm Password"
            placeholder="******"
            value={values.passwordConfirmation}
            error={touched.passwordConfirmation && errors.passwordConfirmation}
            onChangeText={handleChange('passwordConfirmation')}
            type="password"
          />

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

export default ResetForm;
