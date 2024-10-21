import React from 'react';
import { H2, P } from '../common/Text';
import { VictoryPie } from 'victory-native';
import { Colors } from '../../utils/colors';
import normalize from 'react-native-normalize';
import { navigate } from '../../utils/navigation';
import { apiConstants } from '../../utils/apiConstants';
import { ScreenNames } from '../../navigator/ScreenNames';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialCommunityicons from 'react-native-vector-icons/MaterialCommunityIcons';

const DiscoverItem = ({ item, type }: { item: any; type: string; }) => {

  const onCopy = (unique_key: string) => {
    navigate(ScreenNames.CUSTOM_WEB_VIEW_SCREEN, {
      url: apiConstants.GET_COPY_STRATEGY_DETAILS + unique_key
    })
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: normalize(10), maxWidth: '65%' }}>
        <H2 style={{ fontWeight: '500', }}>{item?.strategy_name}</H2>
        <P style={styles.black}>{`Created by- ${item?.first_name} ${item?.last_name}`}</P>
        <P style={[styles.black, { fontWeight: '500' }]}>{`Average Sharpe Ratio- `}
          <P style={{ color: Colors.green, fontWeight: '500' }}>
            {`${Math.round(item?.sr * 100) / 100}`}</P>
        </P>
        <P style={styles.black}>{`${item?.symbol}, ${item?.timeframe}`}</P>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onCopy(item.unique_key)}>
          {/* onPress={() => type == 'Fork' ? '' : onCopy(item.unique_key)}> */}
          <MaterialCommunityicons
            // name={type === 'Fork' ? 'directions-fork' : 'content-copy'}
            name={'content-copy'}
            color={Colors.black}
            size={15}
          />
          {/* <P style={{ marginLeft: 6 }}>{type === 'Fork' ? 'Fork' : 'Copy'}</P> */}
          <P style={{ marginLeft: 6 }}>Copy</P>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'center' }}>
        <VictoryPie
          padding={0}
          innerRadius={40}
          width={110}
          height={110}
          labels={() => null}
          colorScale={[Colors.green, Colors.grey]}
          data={[
            { x: 'a', y: +item?.wp },
            { x: 'b', y: 100 - +item?.wp },
          ]}
        />
        <H2 style={styles.label}>{`${(Math.round(item?.wp) * 100) / 100}%`}</H2>
      </View>
    </View>
  );
};

export default DiscoverItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: normalize(15),
    borderWidth: normalize(0.5),
    borderColor: Colors.darkGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: Colors.green,
    position: 'absolute',
    left: '30%',
    top: '43%'
  },
  black: {
    color: Colors.black,
    paddingVertical: normalize(4)
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: Colors.black,
    paddingVertical: normalize(8),
    borderRadius: normalize(5),
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10),
  },
});
