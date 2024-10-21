import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './navigator/AuthNavigator';

const Screen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AuthNavigator />;
};

export default Screen;
