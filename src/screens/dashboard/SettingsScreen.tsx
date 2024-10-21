import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import normalize from 'react-native-normalize';
import MaterialCommunityicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppButton, Container, H2, Header, P, PrevButton } from '../../components';
import { commonStyles, strategyStyles } from '../../assets/styles';
import { getEmailPrefrences, setEmailPrefrences } from '../../services/strategiesService';
import { Colors } from '../../utils/colors';
import { showToast } from '../../utils/alert';
import { goBack, navigate } from '../../utils/navigation';
import Loader from '../../components/common/Loader';

const ToggleView = ({ prefs, keyVal, title, setData }: {
  prefs: any; keyVal: string; title: string; setData: any;
}) => {

  const user_id = useSelector((state: any) => state?.user?.user_id ?? state?.user?.u_id);

  const setPref = (option: any) => {
    setEmailPrefrences({ user_id, id: keyVal, option })
      .then((res: any) => {
        setData(keyVal, option);
        showToast(res?.message, 'success');
      })
      .catch(err => console.log(err));
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: normalize(4),
      }}>
      <TouchableOpacity onPress={() => setPref(+prefs[keyVal] === 0 ? 1 : 0)}>
        <MaterialCommunityicons
          name={+prefs[keyVal] === 0 ? 'toggle-switch-off' : 'toggle-switch'}
          size={normalize(40)}
          color={+prefs[keyVal] === 0 ? Colors.darkGrey : Colors.green}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: Colors.darkestGrey,
          paddingLeft: normalize(10),
          fontSize: normalize(15),
        }}>
        {title}
      </Text>
    </View>
  );
};

const SettingsScreen = () => {

  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state?.user);
  const [pref, setPref] = useState({
    trading: 0,
    product: 0,
    news: 0,
    notifs: 0,
  });

  useEffect(() => {
    setLoading(true)
    getEmailPrefrences(user?.user_id)
      .then((res: any) => {
        setLoading(false)
        setPref({
          trading: res?.data[0]?.trading_ideas,
          product: res?.data[0]?.product_services,
          news: res?.data[0]?.news,
          notifs: res?.data[0]?.notifications,
        })
      })
      .catch(err => console.log(err));
  }, []);

  const setData = (key: string, val: number) => {
    setPref(prev => ({ ...prev, [key]: val, }))
  };

  return (
    <Container
      containerStyle={strategyStyles.container}
      style={strategyStyles.innerContainer}>
      <Header style={{ width: '90%' }} order={true} />
      {loading ?
        <Loader style={{ height: '100%' }} />
        :
        <>
          <View style={{ width: '80%' }}>
            <H2 style={{ marginVertical: normalize(20) }}>Email Preferences</H2>
          </View>
          <View
            style={{
              width: '80%',
              paddingTop: normalize(5),
              paddingBottom: normalize(35),
            }}>
            <P>Choose which type of emails you wish to receive from us</P>
            <ToggleView
              keyVal="trading"
              title="Trading Ideas"
              prefs={pref}
              setData={setData}
            />
            <ToggleView
              keyVal="product"
              title="Products and Services"
              prefs={pref}
              setData={setData}
            />
            <ToggleView
              keyVal="news"
              title="News and Offers"
              prefs={pref}
              setData={setData}
            />
            <ToggleView
              keyVal="notifs"
              title="Trade Notifications"
              prefs={pref}
              setData={setData}
            />
          </View>

          {/* <H2 style={{marginVertical: normalize(20)}}>Reset Password</H2> */}
          <AppButton
            text="Reset Password"
            onPress={() => navigate('Reset', { email: user?.email, account: true })}
          />
          <View style={{ marginTop: normalize(50) }} />
          <PrevButton onPress={goBack} style={commonStyles.prevBtn} />
        </>
      }
    </Container>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
