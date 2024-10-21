import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Shadow} from 'react-native-shadow-2';
import normalize from 'react-native-normalize';
import {StyleSheet, View} from 'react-native';

import {Container, Header} from '../../components';
import {strategyStyles} from '../../assets/styles';
import {getGlobalOrderBook} from '../../services/strategiesService';
import OrderTable from '../../components/strategies/OrderTable';
import Loader from '../../components/common/Loader';
import EmptyStrategy from '../../components/strategies/EmptyStrategy';
import {updateTable} from '../../utils/notification';

const OrderBookScreen = () => {
  const updatedata = useSelector((state: any) => state?.updatedata);
  const user_id = useSelector(
    (state: any) => state?.user?.user_id ?? state?.user?.u_id,
  );
  const [orders, setOrders] = useState<any>(null);
  const [newOrders, setNewOrders] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    getGlobalOrderBook(user_id)
      .then((res: any) => {
        setOrders(res?.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setNewOrders(null);
    getData();
    updateTable();
  }, []);

  useEffect(() => {
    updatedata?.length > 0 &&
      orders &&
      setNewOrders(
        orders.map((i: any) => ({
          ...i,
          isnew: updatedata?.find((data: any) => i?.id === data?.id)
            ? true
            : false,
        })),
      );
  }, [updatedata, orders]);

  return (
    <Container
      containerStyle={strategyStyles.container}
      style={strategyStyles.innerContainer}>
      <Header style={{width: '90%'}} order={true} />
      {loading ? (
        <Loader />
      ) : orders?.length > 0 ? (
        <View style={{padding: normalize(15), marginBottom: 50}}>
          <Shadow viewStyle={styles.container} distance={1}>
            <OrderTable orders={newOrders ?? orders} orderbook />
          </Shadow>
        </View>
      ) : (
        <EmptyStrategy />
      )}
    </Container>
  );
};

export default OrderBookScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: normalize(5),
    paddingBottom: normalize(11),
    borderRadius: normalize(15),
    marginTop: 12,
    borderColor: '#BBBBBB',
  },
});
