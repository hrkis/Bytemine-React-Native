import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Shadow } from 'react-native-shadow-2';
import normalize from 'react-native-normalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { commonStyles } from '../../assets/styles';
import { deployStrategy, getVirtualWalletDetails } from '../../services/strategiesService';
import { common } from '../../utils/common';
import { H2, P, PrevButton } from '..';
import { Colors } from '../../utils/colors';
import { showToast } from '../../utils/alert';
import PriceSlider from '../common/PriceSlider';
import { setBalance } from '../../redux/data/actions';
import Recharge from './Recharge';
import { useSelector } from 'react-redux';
import Loader from '../common/Loader';

const Deploy = ({ data, setData, user_id, refreshData }: {
  data: any; setData: any, user_id: string, refreshData: any
}) => {

  const [value, setValue] = useState<any>(1);
  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const balance = useSelector((state: any) => state.balance);

  useEffect(() => {
    setLoading(true)
    getVirtualWalletDetails(user_id)
      .then((res: any) => {
        setLoading(false)
        if (res?.balance && Array.isArray(res.balance)) {
          setBalance(res.balance[0].balance_amount)
        }
      })
      .catch(err => console.log(err));
  }, [])

  const onDeploy = () => {
    let newData = { ...data, amount: value }
    setLoading(true)
    deployStrategy(newData)
      .then((res: any) => {
        setLoading(false)
        showToast(res?.message, 'success');
        setData('deploy', null);
        refreshData()
      })
      .catch(err => console.log(err));
  };

  return (
    loading ?
      <Loader />
      :
      <Shadow viewStyle={styles.container} distance={1}>
        <View style={styles.innerContainer}>
          <H2 style={styles.virtual}>Virtual Funds</H2>
          {balance < 10000 ? (
            <Recharge />
          ) : (
            <>
              <P style={styles.subtext}>Deploy part of the remaining balance</P>
              <PriceSlider
                value={value}
                setValue={setValue}
                balance={balance}
                disabled={toggleCheckBox}
              />

              <P style={[styles.subtext, styles.or]}>Or</P>
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() => {
                    toggleCheckBox ? setValue(1) : setValue(balance);
                    setToggleCheckBox(!toggleCheckBox);
                  }}>
                  <MaterialCommunityIcons
                    name={toggleCheckBox ? 'checkbox-outline' : 'checkbox-blank-outline'}
                    color={toggleCheckBox ? Colors.darkestGrey : Colors.darkGrey}
                    size={20}
                  />
                </TouchableOpacity>
                <P style={[styles.subtext, { marginBottom: 0, marginLeft: 5 }]}>
                  Deploy with all the remaining balance
                </P>
              </View>

              <View style={styles.line} />
              <P style={[styles.subtext, styles.soon]}>Strategy add-ons coming soon</P>
            </>
          )}
        </View>
        {balance >= 10000 && (
          <TouchableOpacity
            onPress={onDeploy}
            style={commonStyles.orderContainer}>
            <Text style={commonStyles.order}>Deploy</Text>
          </TouchableOpacity>
        )}
      </Shadow>
  );
};

export default Deploy;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: normalize(5),
    paddingBottom: normalize(11),
    borderRadius: normalize(15),
    marginTop: 12,
    borderColor: '#BBBBBB',
  },
  innerContainer: {
    height: common.ScreenHeight * 0.36,
    paddingHorizontal: normalize(15),
    paddingTop: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtual: {
    // fontSize: normalize(24),
    // fontWeight: '700',
    // color: Colors.red,
    marginBottom: normalize(25),
  },
  subtext: {
    fontWeight: '400',
    color: Colors.darkestGrey,
    marginBottom: normalize(20),
  },
  or: {
    fontWeight: '900',
  },
  soon: {
    fontWeight: '700',
  },
  line: {
    width: '95%',
    height: 1,
    backgroundColor: Colors.darkGrey,
    marginBottom: normalize(25),
    marginTop: normalize(30),
  },

  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
