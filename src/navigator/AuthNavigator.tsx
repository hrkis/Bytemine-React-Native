import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Forgot from '../screens/auth/Forgot';
import Reset from '../screens/auth/Reset';
import TabNavigators from './TabNavigator';
import WelcomeScreen from '../screens/dashboard/WelcomeScreen';
import { useSelector } from 'react-redux';
import SplashScreen from '../screens/dashboard/SplashScreen';
import OnboardingScreen from '../screens/dashboard/OnboardingScreen';
import { ScreenNames } from './ScreenNames';

const Stack = createStackNavigator()

const AuthNavigator = () => {

  const { user, isFirstTime } = useSelector((state: any) => state)

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isFirstTime ? ScreenNames.ON_BOARDING_SCREEN
        : user ? ScreenNames.WELCOME_SCREEN
          : ScreenNames.LOGIN_SCREEN}>

      <Stack.Screen
        name={ScreenNames.ON_BOARDING_SCREEN}
        component={OnboardingScreen} />

      <Stack.Screen
        name={ScreenNames.WELCOME_SCREEN}
        component={WelcomeScreen} />

      <Stack.Screen
        name={ScreenNames.SPLASH_SCREEN}
        component={SplashScreen} />

      <Stack.Screen
        name={ScreenNames.LOGIN_SCREEN}
        component={Login} />

      <Stack.Screen
        name={ScreenNames.FORGOT_SCREEN}
        component={Forgot} />

      <Stack.Screen
        name={ScreenNames.RESET_SCREEN}
        component={Reset} />

      <Stack.Screen
        name={ScreenNames.TAB_SCREEN}
        component={TabNavigators}
        options={{ gestureEnabled: false }} />

    </Stack.Navigator>
  )
}

export default AuthNavigator
