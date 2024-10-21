import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import normalize from 'react-native-normalize';
import { commonStyles } from '../../assets/styles';
import { common } from '../../utils/common';
import { forwardTestOrderBook } from '../../services/strategiesService';
import LineChart from './LineChart';
import OrderTable from './OrderTable';
import { P } from '../common/Text';
import Loader from '../common/Loader';

const OrderBook = ({ onPress, strategy_id }: { onPress: any; strategy_id: string }) => {

  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)
  const [footerLoader, setFooterLoader] = useState(false)

  const setData = (value: any) => {
    let oldData = orderData?.data
    if (oldData && value) {
      let updatedData = oldData.concat(value.data)
      value.data = updatedData
    }
    setOrderData(value)
  }

  const getOrderData = (next_offset: number) => {
    setLoading(next_offset ? false : true)
    setFooterLoader(next_offset ? true : false)
    forwardTestOrderBook(strategy_id, next_offset)
      .then((res: any) => {
        setLoading(false)
        setFooterLoader(false)
        setData(res)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getOrderData(0)
  }, [])

  const height = normalize(
    common.ScreenHeight > 740 ? normalize(common.ScreenHeight * 0.26)
      : normalize(common.ScreenHeight * 0.2)
  )

  const onPagination = () => {
    if (orderData?.next_offset < orderData?.total_count && !footerLoader) {
      getOrderData(orderData?.next_offset)
    }
  }

  return (
    <>
      <View style={[{ height }]}>
        {loading ? (
          <View style={[styles.loaderView, { height }]}>
            <Loader />
          </View>
        ) : orderData?.data.length > 0 ? (
          <View style={{ height }}>
            <OrderTable
              orders={orderData?.data}
              orderbook={false}
              footerLoader={footerLoader}
              onPagination={onPagination}
            />
          </View>
        ) : orderData?.metrics?.investment_array?.length > 0 ? (
          <ScrollView persistentScrollbar={true}>
            <LineChart data={orderData?.metrics} />
          </ScrollView>
        ) : (
          <View style={[styles.msgView, { height }]}>
            <P style={{ textAlign: 'center' }}>
              Our engine is running your strategy in the background. Check
              back later for orders
            </P>
          </View>
        )}

      </View>
      <TouchableOpacity onPress={onPress} style={commonStyles.orderContainer}>
        <Text style={commonStyles.order}>Back to Strategies</Text>
      </TouchableOpacity>
    </>
  )
}

export default OrderBook

const styles = StyleSheet.create({
  loaderView: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  msgView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
