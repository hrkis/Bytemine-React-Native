import {Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import RNModal from 'react-native-modal';
import normalize from 'react-native-normalize';
import {Slider} from '@miblanchard/react-native-slider';

import {setModal} from '../../redux/data/actions';
import {Colors} from '../../utils/colors';
import {H2, P} from '../common/Text';
import {styles} from './styles';
import BorderContainer from '../common/BorderContainer';
import ProfitLoss from '../strategies/ProfitLoss';

const TradeModal = () => {
  const state = useSelector((state: any) => state);

  return (
    <View style={styles.centeredView}>
      <RNModal
        isVisible={state?.show}
        backdropColor={Colors.darkGrey}
        backdropOpacity={0.85}
        onBackdropPress={() => setModal(false)}
        onBackButtonPress={() => setModal(false)}>
        <View style={styles.modalView}>
          <H2 style={[styles.title]}>Trading performance</H2>
          <ProfitLoss stats={state?.stats} />
          <BorderContainer>
            <View style={styles.row}>
              <P>Live Strategies</P>
              <Text style={styles.price}>{state?.stats?.live_strategies}</Text>
            </View>
            <Text
              style={[
                styles.title3,
                {marginTop: 10},
              ]}>{`Win - ${state?.stats?.win_p}%`}</Text>
            <Slider
              value={state?.stats?.win_p}
              disabled={true}
              maximumValue={100}
              maximumTrackTintColor={Colors.grey}
              minimumTrackTintColor={'#55e65e'}
              renderThumbComponent={() => null}
              trackStyle={{
                height: normalize(7),
                borderRadius: normalize(10),
                marginVertical: 0,
              }}
              containerStyle={{marginTop: -5, marginBottom: -12}}
            />
          </BorderContainer>

          <BorderContainer>
            <View style={styles.row}>
              <P>Total Created Strategies</P>
              <Text style={styles.price}>{state?.stats?.total_strategies}</Text>
            </View>
            <Text
              style={[
                styles.title3,
                {marginTop: 10},
              ]}>{`Win - ${state?.stats?.loss_p}%`}</Text>
            <Slider
              value={state?.stats?.loss_p}
              disabled={true}
              maximumValue={100}
              maximumTrackTintColor={Colors.grey}
              minimumTrackTintColor={Colors.red}
              renderThumbComponent={() => null}
              trackStyle={{
                height: normalize(7),
                borderRadius: normalize(10),
                marginVertical: 0,
              }}
              containerStyle={{marginTop: -5, marginBottom: -12}}
            />
          </BorderContainer>
        </View>

        {/* {common.ScreenHeight > 825 && (
            <View style={[styles.rowCenter, {marginTop: normalize(15)}]}>
              <View>
                <P style={styles.smallHeader}>Calculated Expectancy (in %)</P>
                <P style={styles.smallText}>
                  {`Win Expectancy   - ${state?.stats?.expectancy_metrics?.win_expectancy}`}
                </P>
                <P style={styles.smallText}>
                  {`Loss Expectancy  - ${state?.stats?.expectancy_metrics?.loss_expectancy}`}
                </P>
              </View>
              <View>
                <P style={styles.smallHeader}>Recent Percentages (in %)</P>
                <P style={styles.smallText}>
                  {`Recent Win  - ${state?.stats?.expectancy_metrics?.latest_win}`}
                </P>
                <P style={styles.smallText}>
                  {`Recent Loss - ${state?.stats?.expectancy_metrics?.latest_loss}`}
                </P>
              </View>
            </View>
          )} */}
      </RNModal>
    </View>
  );
};

export default TradeModal;
