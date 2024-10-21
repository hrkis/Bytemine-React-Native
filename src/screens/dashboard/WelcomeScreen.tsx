import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Container, H2, P } from '../../components';
import { strategyStyles } from '../../assets/styles';
import { useSelector } from 'react-redux';
import { Colors } from '../../utils/colors';
import { navigate } from '../../utils/navigation';
import { getSplashScreen } from '../../utils/auth';
import store from '../../redux/store';
import { ScreenNames } from '../../navigator/ScreenNames';

const WelcomeScreen = () => {

  const name = useSelector((state: any) => state?.user?.first_name)

  useEffect(() => {
    setTimeout(() => {
      navigate(
        (store as any).getState()?.splash?.should_display_screen &&
          (store as any).getState()?.isfirst
          ? ScreenNames.SPLASH_SCREEN
          : ScreenNames.TAB_SCREEN,
      )
    }, 2000)
    getSplashScreen()
  }, [])

  return (
    <Container
      containerStyle={[strategyStyles.container]}
      style={[strategyStyles.innerContainer, styles.container]}>
      <P>Welcome back</P>
      <H2 style={styles.name}>{name}</H2>
    </Container>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: Colors.red,
    fontSize: 30,
  }
})
