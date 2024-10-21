import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';

import PriceSlider from '../common/PriceSlider';
import { rechargeVirtualFunds } from '../../services/strategiesService';
import { showToast } from '../../utils/alert';
import { setBalance } from '../../redux/data/actions';
import { useSelector } from 'react-redux';
import { Colors } from '../../utils/colors';

const Recharge = () => {
  const state = useSelector((state: any) => state);
  let user = state?.user;
  const [value, setValue] = useState(state?.balance ?? 0);

  const onRecharge = () => {
    rechargeVirtualFunds({ user_id: user?.user_id ?? user?.u_id })
      .then((res: any) => {
        setBalance(res?.updated_wallet_balance);
        showToast('Recharge Successful', 'success');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <PriceSlider value={value} setValue={setValue} disabled balance={50000} />

      <TouchableOpacity
        onPress={onRecharge}
        style={[styles.blackButton, { marginBottom: normalize(40) }]}>
        <Text style={styles.whiteText}>Click to Recharge Funds</Text>
      </TouchableOpacity>
    </>
  );
};

export default Recharge;

const styles = StyleSheet.create({
  blackButton: {
    backgroundColor: Colors.black,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(10),
  },
  whiteText: {
    color: Colors.white,
    fontSize: normalize(12),
    fontWeight: '600',
  },
});
