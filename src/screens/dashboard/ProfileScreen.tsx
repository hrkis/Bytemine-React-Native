import { Linking, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import normalize from 'react-native-normalize';
import MaterialCommunityicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppButton, Container, H2, Header, P, PrevButton } from '../../components';
import { commonStyles, strategyStyles } from '../../assets/styles';
import { Colors } from '../../utils/colors';
import { goBack, navigate } from '../../utils/navigation';
import { removeData, storeData } from '../../utils/storage';
import { setAllowNotification, setAverageMatrics, setIsFirstTime, setStats, setSymbolImage, setUser } from '../../redux/data/actions';
import { disableNotifications, enableNotifications } from '../../utils/notification';
import { getMenuPrefs } from '../../services/strategiesService';
import { ImagePickerComponent, onImageSelectorPress } from '../../utils/picker';
import { changeProfileService } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../navigator/ScreenNames';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const ProfileScreen = () => {

  const navigation = useNavigation<any>();
  const user = useSelector((state: any) => state?.user);
  const enable = useSelector((state: any) => state?.allownotif);
  const [buttonDat, setbuttonData] = useState<any>(null);

  const getExtraMenu = () => {
    getMenuPrefs()
      .then((res: any) => setbuttonData(res?.data))
      .catch(err => console.log(err));
  };

  useEffect(() => getExtraMenu(), []);

  const setNotification = () => {
    removeData('notif')
      .then(() => {
        setAllowNotification(true);
        enableNotifications();
      })
      .catch(err => console.log(err));
  };

  const removeNotification = () => {
    storeData('notif', 'disable')
      .then(res => {
        setAllowNotification(false);
        disableNotifications();
      })
      .catch(err => console.log(err));
  };

  const changeProfile = (file: any) => {
    changeProfileService({ user_id: user?.user_id ?? user?.u_id, file })
      .then((res: any) => {
        if (res?.success) setUser({ ...user, profile_pic: res?.url });
      })
      .catch(err => console.log(err));
  };

  const clearData = () => {
    setUser(null)
    setStats(null)
    setSymbolImage([])
    setAverageMatrics([])
    disableNotifications()
  }

  const logOut = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.LOGIN_SCREEN }]
      })
      clearData()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      containerStyle={strategyStyles.container}
      style={strategyStyles.innerContainer}>
      <Header style={{ width: '90%' }} order={true} />
      <View style={styles.center}>
        <View style={styles.imageContainer}>
          {user?.profile_pic ? (
            <FastImage source={{ uri: user?.profile_pic }} style={styles.image} />
          ) : (
            <MaterialCommunityicons
              name="account-circle"
              color={Colors.darkGrey}
              size={170}
            />
          )}
          <TouchableOpacity
            onPress={onImageSelectorPress}
            style={{ position: 'absolute', right: 5, bottom: 5 }}>
            <MaterialCommunityicons
              name="pencil-box"
              color={Colors.darkestGrey}
              size={40}
            />
          </TouchableOpacity>
        </View>
        <ImagePickerComponent onPicked={(data: any) => changeProfile(data)} />
        <H2 style={styles.mt15}>{`${user?.first_name} ${user?.last_name}`}</H2>
        <P>{user?.email}</P>

        <View style={styles.buttonsContainer}>
          {/* <AppButton
            onPress={() => navigate('Refer')}
            style={[styles.button, styles.mr30]}
            text="Refer a Friend"
          /> */}
          {/* <AppButton
            onPress={() => Linking.openURL('https://bytemine.statuspage.io/')}
            style={[styles.button, styles.mr30]}
            text="Application Status"
          /> */}
          <AppButton
            onPress={() => navigate('Virtual')}
            style={[styles.button, styles.mr30]}
            text="View Virtual Funds"
          />
          <AppButton
            onPress={() => navigate('Settings')}
            style={[styles.button, styles.mr30]}
            text="Account Settings"
          />
          <AppButton
            onPress={() => {
              enable ? removeNotification() : setNotification();
            }}
            style={[styles.button, {
              backgroundColor: enable ? Colors.black : Colors.red
            }]}
            text={`${enable ? 'Disable' : 'Enable'} Notifications`}
          />

          {buttonDat?.should_display_menu && (
            <AppButton
              onPress={() => Linking.openURL(buttonDat?.link)}
              style={[styles.button, styles.mr30, {
                backgroundColor: buttonDat?.button_color, color: Colors.black
              }]}
              text={buttonDat?.title}
            />
          )}
          <AppButton onPress={logOut} style={[styles.button]} text="Log Out" />
          {/* <AppButton
            // onPress={() => navigate('Balance')}
            onPress={() => {}}
            style={styles.button}
            text="Check Broker Balance"
          /> */}
        </View>
        {/* <TouchableOpacity onPress={logOut}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity> */}
      </View>
      <PrevButton onPress={goBack} style={commonStyles.prevBtn} />
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  button: {
    width: normalize(100),
    paddingHorizontal: normalize(5),
    marginBottom: normalize(30),
    ...Platform.select({
      android: {
        height: normalize(70),
      },
      ios: {
        height: normalize(60),
      },
    }),
  },
  mr30: {
    marginRight: normalize(15),
  },
  buttonsContainer: {
    marginTop: normalize(35),
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: normalize(20),
  },
  center: {
    marginTop: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logout: {
    marginTop: normalize(30),
    marginBottom: normalize(20),
    fontWeight: '700',
    color: Colors.darkestGrey,
    fontSize: normalize(15),
  },
  image: {
    width: normalize(160),
    height: normalize(160),
    borderRadius: normalize(80),
  },
  imageContainer: {
    width: normalize(165),
    height: normalize(165),
    borderRadius: normalize(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fce5ea',
  },
  mt15: {
    marginTop: normalize(15),
  },
});
