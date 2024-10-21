import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import DiscoverItem from './DiscoverItem';
import Loader from '../common/Loader';
import EmptyStrategy from '../strategies/EmptyStrategy';
import {
  getCopiableStrategies,
  getForkableStrategies,
} from '../../services/discoverService';
import normalize from 'react-native-normalize';
import {common} from '../../utils/common';

const getStrategies = (selected: string, setData: any, setLoading: any) => {
  setLoading(true);
  setData(selected, null);
  switch (selected) {
    case 'Fork':
      return getForkableStrategies()
        .then((res: any) => {
          setLoading(false);
          setData(selected, res);
        })
        .catch(err => console.log(err));

    case 'Copy':
      return getCopiableStrategies()
        .then((res: any) => {
          setLoading(false);
          setData(selected, res);
        })
        .catch(err => console.log(err));
  }
};

const DiscoverList = ({
  strategies,
  setData,
  selected,
}: {
  strategies: any;
  setData: any;
  selected: string;
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStrategies(selected, setData, setLoading);
  }, [selected]);

  return loading ? (
    <Loader />
  ) : strategies?.length > 0 ? (
    <ScrollView style={styles.container}>
      {strategies.map((item: any, index: number) => (
        <DiscoverItem item={item} key={index} type={selected} />
      ))}
    </ScrollView>
  ) : (
    <EmptyStrategy />
  );
};

export default DiscoverList;

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(20),
    width: '100%',
    paddingHorizontal: normalize(15),
    paddingTop: normalize(10),
    // marginBottom: normalize(170),
    // height: normalize(common.ScreenHeight * 0.7),
  },
});
