import {Text, View} from 'react-native';
import React from 'react';
import RNModal from 'react-native-modal';
import normalize from 'react-native-normalize';
import MaterialCommunityicons from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from './styles';
import {Colors} from '../../utils/colors';
import {P} from '../common/Text';

const LiveModal = ({show, setShow}: {show: boolean; setShow: any}) => {
  return (
    <View style={styles.centeredView}>
      <RNModal
        isVisible={show}
        backdropColor={Colors.darkGrey}
        backdropOpacity={0.85}
        onBackdropPress={() => setShow(false)}
        onBackButtonPress={() => setShow(false)}>
        <View style={styles.modalView}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: normalize(20),
            }}>
            <MaterialCommunityicons
              name="toggle-switch-outline"
              color={Colors.darkGreen}
              size={30}
            />
            <P style={{fontSize: normalize(8)}}>LIVE</P>
          </View>
          <Text style={styles.title2}>Live Version Coming soon.</Text>
        </View>
      </RNModal>
    </View>
  );
};

export default LiveModal;
