import { View, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Container, Header } from '../../components';
import { strategyStyles } from '../../assets/styles';
import normalize from 'react-native-normalize';
import { useSelector } from 'react-redux';
import { getCopiableStrategies, getForkableStrategies } from '../../services/discoverService';
import Loader from '../../components/common/Loader';
import EmptyStrategy from '../../components/strategies/EmptyStrategy';
import DiscoverItem from '../../components/discover/DiscoverItem';
import { Colors } from '../../utils/colors';
import { appStrings } from '../../utils/appStrings';
import ProfitContainer from '../../components/strategies/ProfitContainer';

const DiscoverScreen = () => {

  const options = ['Fork', 'Copy'];
  const [selected, setSelected] = useState(options[0]);
  const [footerLoader, setFooterLoader] = useState(false)
  const [loading, setLoading] = useState(false);
  const [strategies, setStrategies] = useState<any>({
    Fork: null,
    Copy: null,
  });

  const { user, stats } = useSelector((state: any) => state);
  const user_id = user?.user_id

  const setData = (key: string, value: any) => {
    const oldData = strategies[key]?.data
    if (oldData && value) {
      const updatedData = oldData.concat(value.data)
      value.data = updatedData
    }
    setStrategies((prev: any) => ({ ...prev, [key]: value }))
  }

  const getStrategies = (next_offset: number) => {
    setLoading(next_offset ? false : true)
    setFooterLoader(next_offset ? true : false)
    switch (selected) {
      case 'Fork':
        return getForkableStrategies(user_id, next_offset)
          .then((res: any) => {
            setLoading(false)
            setFooterLoader(false)
            setData(selected, res)
          })
          .catch(err => console.log(err))

      case 'Copy':
        return getCopiableStrategies(user_id, next_offset)
          .then((res: any) => {
            setLoading(false)
            setFooterLoader(false)
            setData(selected, res)
          })
          .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    setStrategies({
      Fork: null,
      Copy: null
    })
    getStrategies(0)
  }, [selected])

  const onPagination = () => {
    if (strategies[selected]?.next_offset < strategies[selected]?.total_count && !footerLoader) {
      getStrategies(strategies[selected]?.next_offset)
    }
  }

  const ListHeaderComponent = () => {
    const netTotal = stats?.virtual_liveprofit - stats?.virtual_liveLoss
    return (
      <View style={styles.listHeaderContainer}>
        <ProfitContainer
          title={appStrings.METRICS}
          item1={appStrings.NET_TOTAL + " : "}
          value1={netTotal.toFixed(4)}
          item2={appStrings.AVERAGE_WIN + "% : "}
          value2={stats?.virtual_liveWinPercent.toFixed(4)}
          item1Color={netTotal > 0 ? Colors.green : Colors.lightred}
          item2Color={stats?.virtual_liveWinPercent > 0 ? Colors.green : Colors.lightred}
        />
        <ProfitContainer
          title={appStrings.STRATEGIES}
          item1={appStrings.TOTAL_DEPLOYED + " - " + stats?.total_live_strategies}
          item2={appStrings.TOTAL_CREATED + " - " + stats?.total_strategies}
        />
      </View>
    )
  }

  return (
    <Container
      containerStyle={strategyStyles.container}
      style={strategyStyles.innerContainer}>
      <Header style={{ width: '90%' }} order={true} />

      {/* <ToogleTabs
        style={{ marginVertical: normalize(20), justifyContent: 'space-evenly' }}
        options={options}
        selected={selected}
        setSelected={setSelected}
      /> */}

      {loading ?
        <Loader style={{ height: '90%' }} />
        : strategies[selected]?.data.length > 0 ?
          <View style={styles.listContainer}>
            <FlatList
              data={strategies[selected]?.data}
              style={styles.listView}
              onEndReached={onPagination}
              onEndReachedThreshold={0.1}
              ListHeaderComponent={ListHeaderComponent}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContentContainer}
              ItemSeparatorComponent={() => <View style={styles.seperatorView} />}
              renderItem={({ item, index }) => {
                return (
                  <DiscoverItem
                    item={item}
                    type={selected}
                  />
                )
              }}
            />
          </View>
          :
          <EmptyStrategy />
      }
    </Container>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  listView: {
    marginTop: normalize(10),
    paddingHorizontal: normalize(15)
  },
  listContentContainer: {
    paddingVertical: normalize(10)
  },
  listHeaderContainer: {
    flexDirection: 'row',
    marginBottom: normalize(15),
    justifyContent: 'space-between'
  },
  seperatorView: {
    height: normalize(15)
  }
})
