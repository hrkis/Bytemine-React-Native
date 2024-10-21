import { View, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import FastImage from 'react-native-fast-image';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppleButton, AppTextInput, Container, GoogleButton, H1, LinkedInButton, NextButton, P, ValidatedButton } from '../../components';
import { loginStyles } from '../../assets/styles';
import { navigate } from '../../utils/navigation';
import { loginSchema } from '../../utils/schema';
import { loginService } from '../../services/authService';
import { setFirst, setUser } from '../../redux/data/actions';
import { showToast } from '../../utils/alert';
import { googleLogin, linkedInLogin, onAppleButtonPress } from '../../utils/auth';
import LinkedInModal from 'react-native-linkedin';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../navigator/ScreenNames';

const Login = () => {

  const navigation = useNavigation<any>()
  const [loading, setLoading] = useState(false)
  const linkedRef: any = React.createRef<LinkedInModal>()

  const onSubmit = (values: any) => {
    setLoading(true)
    loginService(values)
      .then((data: any) => {
        setLoading(false)
        if (data?.success) {
          setUser(data)
          setFirst(true)
          navigation.reset({
            index: 0,
            routes: [{ name: ScreenNames.WELCOME_SCREEN }]
          })
        } else showToast(data?.message, 'error')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '572481986308-piprj4eilsum79n506orq8pjuk1ptmlg.apps.googleusercontent.com',
    })

    linkedRef?.current && linkedRef?.current.logoutAsync()
  }, [])

  return (
    <Container style={loginStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImage
          source={require('../../assets/images/mktdynamicLogo.png')}
          resizeMode="contain"
          style={loginStyles.logo}
        />
        <H1>Login</H1>
        <View style={loginStyles.gap} />

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => onSubmit(values)}
          validationSchema={loginSchema}>
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <>
              <AppTextInput
                label="Email"
                value={values.email}
                error={touched.email && errors.email}
                onChangeText={handleChange('email')}
                placeholder="xyz@example.com"
              />
              <AppTextInput
                label="Password"
                value={values.password}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                placeholder="******"
                type="password"
              />
              <View style={loginStyles.textContainer}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.mktdynamics.com/')
                  }>
                  {/* <P>Not a user? Request Invite</P> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Forgot')}>
                  <P>Forgot Password</P>
                </TouchableOpacity>
              </View>

              <P style={loginStyles.or}>or</P>

              <View
                style={[
                  loginStyles.socialContainer,
                  { width: Platform.OS === 'ios' ? '45%' : '30%' },
                ]}>
                <GoogleButton onPress={googleLogin} />
                <LinkedInModal
                  ref={linkedRef}
                  clientID={'86tkd1qv0etzif'}
                  clientSecret={'IqmVOmZPQ6Vx0lCS'}
                  redirectUri={'https://www.mktdynamics.com/'}
                  onSuccess={async (val: any) =>
                    linkedInLogin(val?.access_token)
                  }
                  renderButton={() => (
                    <LinkedInButton
                      onPress={() => {
                        if (linkedRef?.current) {
                          linkedRef.current.open()
                        }
                      }}
                    />
                  )}
                />
                {Platform.OS === 'ios' && (
                  <AppleButton onPress={onAppleButtonPress} />
                )}
              </View>

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
      </ScrollView>
    </Container>
  )
}

export default Login
