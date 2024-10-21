import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';
import { Shadow } from 'react-native-shadow-2';
import moment from 'moment';
import { Colors } from '../../utils/colors';
import WinLevel from './WinLevel';
import Toggle from './Toggle';
import { commonStyles } from '../../assets/styles';
import OrderBook from './OrderBook';
import { unDeployStrategy } from '../../services/strategiesService';
import { useSelector } from 'react-redux';
import { showToast } from '../../utils/alert';
import { common } from '../../utils/common';
import { P } from '../common/Text';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StrategyItem = ({ item, selected, order, setData, refreshData }: {
  item: any; selected?: boolean; order?: boolean; setData?: any; refreshData?: any
}) => {

  const symbolIconSize = normalize(15)
  const [isOn, setIsOn] = useState(item?.is_forward_test_deployed);

  const { user, symbolImages, liveMode, averageMatrics } = useSelector((state: any) => state);

  const getColor = (level: number) => {
    switch (level) {
      case 1:
        return Colors.lightpink;
      case 2:
        return Colors.lightyellow;
      case 3:
        return Colors.lightergreen;
      case 4:
        return Colors.lightgreen;
    }
  }

  const onTogglePress = (strategy_id: string, vsb_unique_key: string) => {
    let user_id = user.user_id
    if (!isOn) {
      setData('deploy', { strategy_id, user_id, amount: 1, vsb_unique_key }, () =>
        setIsOn(!isOn),
      );
      //navigate to other page
    } else {
      unDeployStrategy(strategy_id, user_id)
        .then((res: any) => {
          showToast(res?.message, 'success')
          setIsOn(!isOn)
          refreshData()
        })
        .catch(err => console.log(err))
    }
  }

  const symbolImageData = symbolImages.find((findItem: any) => findItem.name == item.symbol)
  const averageMatricsData = averageMatrics.find((findItem: any) => findItem.strategy_id == item.vs_id)
  const level = Math.ceil(averageMatricsData?.value / 25)
  const color = getColor(level)

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <FastImage
          source={symbolImageData?.url ? { uri: symbolImageData.url }
            : require('../../assets/images/placeholder.png')}
          style={styles.imagestyle} resizeMode="contain" />
        <View style={styles.firstContainer}>
          <View style={{ width: common.ScreenWidth * 0.5 }}>
            <Text style={styles.greyText}>{item?.strategy_name} - {item?.timeframe}</Text>
            <View style={styles.middleView}>
              <Text style={styles.symbol}>{item?.symbol}</Text>
              <MaterialCommunityIcons
                name="circle"
                color={item?.is_forward_test_deployed ? Colors.green : Colors.lightred}
                size={symbolIconSize}
                style={styles.symbolIcon}
              />
              {item.is_deployed_live == '1' &&
                <MaterialCommunityIcons
                  name="lightning-bolt"
                  color={Colors.green}
                  size={symbolIconSize}
                  style={styles.symbolIcon}
                />
              }
              {item.is_forward_test_deployed &&
                <Ionicons
                  name="cube"
                  color={Colors.blue}
                  size={symbolIconSize}
                  style={styles.symbolIcon}
                />
              }
              {item.add_ons &&
                <MaterialCommunityIcons
                  name="puzzle"
                  color={Colors.yellow}
                  size={symbolIconSize}
                  style={[styles.symbolIcon, {
                    transform: [{ rotateY: '180deg' }]
                  }]}
                />
              }
            </View>
          </View>
        </View>
        <WinLevel win={averageMatricsData?.value} color={color} level={level} />
      </View>
      {selected && (
        <View style={[styles.firstContainer, {
          marginBottom: selected && !order && isOn ? 0 : normalize(10),
          paddingHorizontal: normalize(10)
        }]}>
          <View style={{ width: '85%' }}>
            <Text style={styles.date}>
              Created:{' '}
              {moment(item?.strategy_created_at).format('Do MMMM YYYY')}
            </Text>
            {item?.deployed_at && (
              <Text style={styles.date}>
                Deployed: {moment(item?.deployed_at).format('Do MMMM YYYY')}
              </Text>
            )}
          </View>
          <View style={styles.center}>
            <P style={styles.forwardText}>{liveMode ? 'Deploy live' : 'Forward Test Deploy'}</P>
            <Toggle
              isOn={isOn}
              onPress={() => onTogglePress(item?.vs_id, item?.vsb_unique_key)}
            />
            {/* <Text style={styles.toggleText}>On / Off</Text> */}
          </View>
        </View>
      )}
      {selected && !order && isOn && (
        <TouchableOpacity
          onPress={() => setData('detail', item)}
          style={commonStyles.orderContainer}>
          <Text style={commonStyles.order}>View Order Book</Text>
        </TouchableOpacity>
      )}
      {order && (
        <OrderBook
          strategy_id={item?.vs_id}
          onPress={() => setData('detail', null)}
        />
      )}
    </View>
  );
};

export default StrategyItem;

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowColor: Colors.black,
    borderRadius: normalize(15),
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 5 }
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(10)
  },
  imagestyle: {
    width: normalize(40),
    height: normalize(40),
    marginRight: normalize(10),
    borderRadius: normalize(25)
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  greyText: {
    fontWeight: '400',
    fontSize: normalize(14),
    color: Colors.darkestGrey,
  },
  middleView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(3)
  },
  symbol: {
    fontWeight: '600',
    color: Colors.black,
    fontSize: normalize(18)
  },
  symbolIcon: {
    marginLeft: 5
  },
  toggleText: {
    fontSize: normalize(7),
    color: Colors.darkestGrey,
  },
  center: {
    width: '15%'
  },
  date: {
    fontWeight: '400',
    fontSize: normalize(15),
    color: Colors.darkestGrey
  },
  forwardText: {
    textAlign: 'center',
    fontSize: normalize(10),
    marginBottom: normalize(5)
  }
});
