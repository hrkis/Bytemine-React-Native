import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import normalize from 'react-native-normalize';
import FastImage from 'react-native-fast-image';
import MaterialCommunityicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../utils/colors';
import { P } from '..';
import { setModal, setLiveMode } from '../../redux/data/actions';
import LiveModal from '../trade/LiveModal';
import { useNavigation } from '@react-navigation/native';

const Header = ({ style, order }: { style: any; order?: boolean }) => {
  const user = useSelector((state: any) => state?.user);
  const showModal = useSelector((state: any) => state?.show);
  const liveMode = useSelector((state: any) => state?.liveMode);
  const [show, setShow] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    console.log("live mode ", liveMode);
  }, [liveMode]);

  return (
    <View style={[styles.container, style]}>
      <LiveModal show={show} setShow={setShow} />
      <TouchableOpacity
        style={{ height: normalize(25), width: '40%' }}
        onPress={() =>
          navigation?.navigate('Strategies', { screen: 'StrategiesScreen' })
        }>
        <FastImage
          source={require('../../assets/images/mktdynamicLogo.png')}
          resizeMode="contain"
          style={{ height: normalize(25), width: '100%' }}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {order ? (
          null
          // <TouchableOpacity
          //   onPress={() => setModal(true)}
          //   style={[
          //     styles.container2,
          //     {backgroundColor: showModal ? Colors.black : Colors.red },
          //   ]}>
          //   <MaterialCommunityicons
          //     name="text-box-search-outline"
          //     color={showModal ? Colors.white : Colors.white}
          //     size={20}
          //   />
          // </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setLiveMode(!liveMode)}
            style={{
              marginRight: normalize(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityicons
              name={!liveMode ? "toggle-switch-off-outline" : "toggle-switch-outline"}
              color={!liveMode ? Colors.pista : Colors.green}
              size={35}
            />
            <P style={{ fontSize: normalize(8), marginTop: -3 }}>{liveMode ? 'LIVE' : 'VIRTUAL'}</P>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation?.navigate('Profile')}>
          {user?.profile_pic ? (
            <FastImage
              source={{ uri: user?.profile_pic }}
              style={styles.profile}
            />
          ) : (
            <MaterialCommunityicons
              name="account-circle"
              color={Colors.darkGrey}
              size={30}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  profile: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(20),
  },
  container2: {
    backgroundColor: Colors.grey,
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(10),
    borderRadius: normalize(20),
    marginRight: normalize(10),
  },
});
