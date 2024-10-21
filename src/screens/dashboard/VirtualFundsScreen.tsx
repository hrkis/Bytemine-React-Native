import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Shadow } from 'react-native-shadow-2';
import normalize from 'react-native-normalize';
import FastImage from 'react-native-fast-image';
import MaterialCommunityicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, H2, Header, P, PrevButton } from '../../components';
import { strategyStyles } from '../../assets/styles';
import { Colors } from '../../utils/colors';
import { goBack } from '../../utils/navigation';
import { getVirtualWalletDetails } from '../../services/strategiesService';
import { common, numberWithCommas } from '../../utils/common';
import ProfitLoss from '../../components/strategies/ProfitLoss';
import Recharge from '../../components/strategies/Recharge';
import { setBalance } from '../../redux/data/actions';
import BorderContainer from '../../components/common/BorderContainer';
import moment from 'moment';
import Loader from '../../components/common/Loader';

const VirtualFundsScreen = () => {

  const [loading, setLoading] = useState(false);
  const [rechargeList, setRechargeList] = useState<any>(null);
  const [profitLossData, setProfitLossData] = useState<any>(null);

  const { user, stats, balance } = useSelector((state: any) => state);

  useEffect(() => {
    setLoading(true)
    getVirtualWalletDetails(user.user_id)
      .then((res: any) => {
        setLoading(false)
        setRechargeList(res.recharge_history)
        if (res?.balance && Array.isArray(res.balance)) {
          setBalance(res.balance[0].balance_amount)
        }
        setProfitLossData(res.profit_loss)
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <Container
      containerStyle={strategyStyles.container}
      style={strategyStyles.innerContainer}>
      <Header style={{ width: '90%' }} order={true} />
      {loading ?
        <Loader style={{ height: '100%' }} />
        :
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            width: common.ScreenWidth * 0.85,
          }}>

          <View style={[styles.row, {
            marginTop: normalize(15), alignSelf: 'flex-start'
          }]}>
            {user?.profile_pic ? (
              <FastImage source={{ uri: user?.profile_pic }} style={styles.image} />
            ) : (
              <MaterialCommunityicons
                name="account-circle"
                color={Colors.darkGrey}
                size={60}
              />
            )}
            <View style={{ marginLeft: normalize(10) }}>
              <H2
                style={
                  styles.mt15
                }>{`${user?.first_name} ${user?.last_name}`}</H2>
              <P>{user?.email}</P>
            </View>
          </View>

          <H2 style={styles.virtual}>Virtual Funds</H2>
          {/* <ProfitLoss stats={profitLossData} /> */}

          <BorderContainer>
            <View style={styles.row}>
              <P style={styles.black}>Remaining Balance</P>
              <Text style={styles.price}>${balance}</Text>
            </View>
          </BorderContainer>

          {/* <BorderContainer>
          <View style={styles.row}>
            <P style={styles.black}>Total Deployed</P>
            <Text style={styles.price}>${stats?.total_deployed}</Text>
          </View>
        </BorderContainer> */}

          {balance < 10000 ? (
            <Recharge />
          ) : (
            <>
              <H2 style={styles.virtual}>Recharge History</H2>
              <Shadow viewStyle={styles.container} distance={1}>
                <View style={{ height: normalize(common.ScreenHeight * 0.28) }}>
                  <View style={[styles.tableContainer, styles.header]}>
                    <P style={[styles.one, styles.black]}>#</P>
                    <P style={[styles.two, styles.black]}>Amount</P>
                    <P style={[styles.three, styles.black]}>Date</P>
                  </View>
                  <FlatList
                    data={rechargeList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }: { item: any; index: number }) => {
                      return (
                        <View style={styles.tableContainer} key={index}>
                          <P style={[styles.one, styles.black]}>{(index + 1).toString()}</P>
                          <P style={[styles.two, styles.black]}>
                            {`$${numberWithCommas(+item?.amount)}`}
                          </P>
                          <P style={[styles.three, styles.black]}>
                            {moment(item?.created_at).format('MMM DD, YYYY, HH:MM')}
                          </P>
                        </View>
                      )
                    }} />
                </View>
              </Shadow>
            </>
          )}

          <PrevButton onPress={goBack} style={{ marginBottom: 10 }} />
        </ScrollView>
      }
    </Container>
  );
};

export default VirtualFundsScreen;

const styles = StyleSheet.create({
  image: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(35),
  },
  mt15: {
    marginTop: normalize(5),
  },
  center: {
    marginTop: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtual: {
    // fontSize: normalize(24),
    // fontWeight: '400',
    // color: Colors.red,
    marginBottom: normalize(30),
    marginTop: normalize(20),
    alignSelf: 'flex-start',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  redprice: {
    fontSize: normalize(15),
    fontWeight: '500',
    color: Colors.red,
    marginTop: normalize(3),
  },
  container: {
    width: '100%',
    marginVertical: normalize(5),
    paddingBottom: normalize(11),
    // borderRadius: normalize(15),
    // marginTop: 12,
    borderColor: '#BBBBBB',
  },
  tableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(8),
    paddingLeft: normalize(20),
  },
  header: {
    backgroundColor: Colors.grey,
    marginTop: normalize(-10),
    paddingVertical: normalize(10),
    // borderTopLeftRadius: normalize(15),
    // borderTopRightRadius: normalize(15),
  },
  black: {
    color: Colors.black,
  },
  one: {
    width: common.ScreenWidth * 0.1,
    textAlign: 'center'
  },
  two: {
    width: common.ScreenWidth * 0.25,
    textAlign: 'center'
  },
  three: {
    width: common.ScreenWidth * 0.5,
    textAlign: 'center'
  },
  title: {
    color: Colors.black,
    fontWeight: '700',
    paddingBottom: normalize(15),
  },
  price: {
    color: Colors.black,
    fontWeight: '500',
    marginRight: normalize(3),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
