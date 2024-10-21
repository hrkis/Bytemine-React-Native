import { FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import moment from 'moment';
import normalize from 'react-native-normalize';
import { P } from '..';
import { Colors } from '../../utils/colors';
import { common } from '../../utils/common';

const OrderTable = ({ orders, orderbook, footerLoader, onPagination }: {
  orders: any; orderbook?: boolean; footerLoader?: boolean; onPagination?: any
}) => {

  const ListFooterComponent = () => {
    return (
      footerLoader ?
        <ActivityIndicator style={{ paddingVertical: normalize(20) }} color={Colors.red} />
        : null
    )
  }

  return (
    <ScrollView
      horizontal={true}
      persistentScrollbar={true}
      style={[orderbook ?
        { marginTop: -normalize(11), borderRadius: 12 }
        : { marginHorizontal: normalize(10) }]}>
      <View>
        <View style={[styles.tableContainer, { backgroundColor: Colors.grey }]}>
          {orderbook && (
            <P style={[styles.black2, styles.one]}>Instrument Name</P>
          )}
          {orderbook && (
            <P style={[styles.black2, styles.one, { paddingRight: 10 }]}>Strategy Name</P>
          )}
          {orderbook &&
            <P style={[styles.black2, styles.one]}>Timeframe</P>
          }
          <P style={[styles.black2, styles.one]}>Order Price</P>
          <P style={[styles.black2, styles.three]}>Decision</P>
          <P style={[styles.black2, styles.two]}>Target</P>
          <P style={[styles.black2, styles.four]}>Stop Loss</P>
          <P style={[styles.black2, styles.five]}>Result</P>
          <P style={[styles.black2, styles.eight, { paddingRight: 15 }]}>Trade Opened</P>
          <P style={[styles.black2, styles.seven, { paddingRight: 10 }]}>Trade Closed</P>
        </View>
        <FlatList
          data={orders}
          onEndReachedThreshold={0.1}
          onEndReached={onPagination}
          ListFooterComponent={ListFooterComponent}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }: { item: any; index: number }) => {
            return (
              <View style={[styles.tableContainer]} key={index}>
                {orderbook && (
                  <View>
                    <P style={[styles.black, styles.one]}>{item?.symbol}</P>
                    {item?.isnew && (
                      <View style={styles.newContainer}>
                        <P style={{ color: Colors.white, fontSize: normalize(12) }}>New</P>
                      </View>
                    )}
                  </View>
                )}
                {orderbook && (
                  <P style={[styles.black, styles.one]}>{item?.strategy_name}</P>
                )}
                {orderbook && (
                  <P style={[styles.black, styles.one]}>{item?.timeframe}</P>
                )}
                <P style={[styles.black, styles.one]}>
                  {Number.parseFloat(item?.order_price).toFixed(4)}
                </P>
                <P style={[styles.black, styles.two]}>
                  {item?.decision.toUpperCase()}
                </P>
                <P style={[styles.black, styles.three]}>
                  {Number.parseFloat(item?.target).toFixed(4)}
                </P>
                <P style={[styles.black, styles.four]}>
                  {Number.parseFloat(item?.stoploss).toFixed(4)}
                </P>
                <P style={[styles.black, styles.five, {
                  color: item?.result ?
                    item?.result > 0 ? Colors.green
                      : Colors.red
                    : Colors.black
                }]}>
                  {item?.result ?
                    `${item?.result[0]}${Number.parseFloat(item?.result.substring(1)).toFixed(4)}`
                    : 'Trade in progress'
                  }
                </P>
                <P style={[styles.black, styles.six]}>
                  {moment(item?.trade_taken_at * 1000).format('MMM DD, YYYY, HH:MM')}
                </P>
                <P style={[styles.black, styles.seven]}>
                  {moment(item?.trade_closed_at * 1000).format('MMM DD, YYYY, HH:MM')}
                </P>
              </View>
            )
          }} />
      </View>
    </ScrollView>
  )
}

export default OrderTable

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    paddingLeft: normalize(20),
  },
  black: {
    color: Colors.black,
    alignSelf: 'center',
  },
  black2: {
    color: Colors.black,
    alignSelf: 'center',
    fontSize: normalize(12),
    fontWeight: '500',
  },
  pink: {
    color: Colors.red,
    alignSelf: 'center',
    fontSize: normalize(12),
    fontWeight: '500',
  },
  one: {
    width: common.ScreenWidth * 0.21,
  },
  two: {
    width: common.ScreenWidth * 0.21,
  },
  three: {
    width: common.ScreenWidth * 0.22,
  },
  four: {
    width: common.ScreenWidth * 0.22,
  },
  five: {
    width: common.ScreenWidth * 0.22,
  },
  six: {
    width: common.ScreenWidth * 0.23,
  },
  seven: {
    width: common.ScreenWidth * 0.24,
    paddingRight: 10,
  },
  eight: {
    width: common.ScreenWidth * 0.24,
  },
  newContainer: {
    backgroundColor: Colors.red,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 3,
    alignSelf: 'flex-start',
  }
})
