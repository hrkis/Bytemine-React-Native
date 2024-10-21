import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppTextInput, Container, Header, PrevButton, ToogleTabs } from '../../components';
import StrategyItem from '../../components/strategies/StrategyItem';
import Deploy from '../../components/strategies/Deploy';
import { commonStyles, strategyStyles } from '../../assets/styles';
import normalize from 'react-native-normalize';
import { Colors } from '../../utils/colors';
import { common } from '../../utils/common';
import Loader from '../../components/common/Loader';
import EmptyStrategy from '../../components/strategies/EmptyStrategy';
import { getAverageMatrics, getStrategiesListData } from '../../services/strategiesService';
import { useSelector } from 'react-redux';
import { postRequest } from '../../services/api';
import { apiConstants } from '../../utils/apiConstants';
import { setAverageMatrics, setSymbolImage } from '../../redux/data/actions';
import { StrategyAddOns } from '../../components/strategies/StrategyAddOnsModal';
import { StrategyBrokerList } from '../../components/strategies/StrategyBrokersListModal';
import { StrategyBrokerDetailModal } from '../../components/strategies/StrategyBrokersDetailModal';
import _ from 'lodash';
import ProfitContainer from '../../components/strategies/ProfitContainer';
import { appStrings } from '../../utils/appStrings';
import { StrategyBrokerConfirmTradeMode } from '../../components/strategies/StrategyBrokersConfirmTradeMode';
import { StrategyDeployConfirmation } from '../../components/strategies/StrategyDeployConfirmation';

const tabOptions = {
  CREATED: 'Created',
  COPIED: 'Copied',
  FORKED: 'Forked'
}

const StrategiesScreen = () => {

  const options = [tabOptions.CREATED, tabOptions.COPIED, tabOptions.FORKED];
  const [selected, setSelected] = useState(options[0]);
  const [strategies, setStrategies] = useState<any>({
    Created: null,
    Copied: null,
    Forked: null,
    detail: null,
    deploy: null,
  });
  const [loading, setLoading] = useState(false);
  const [footerLoader, setFooterLoader] = useState(false)
  const [showindex, setShowindex] = useState<any>(null);
  const [showBrokersList, setShowBrokersList] = useState(false);
  const [showBrokerDetail, setShowBrokersDetail] = useState(false);
  const [broker, setSelectedBroker] = useState('');

  const { user, symbolImages, liveMode, averageMatrics, stats } = useSelector((state: any) => state);
  const user_id = user?.user_id
  const [strategy_id, setStrategyId] = useState('');
  const [addOnsData, setAddOnsData] = useState({});
  const [vsb_unique_key, setVsbUniqueKey] = useState('');
  const [doc_url, setDocUrl] = useState('');
  const [apiKeysFilled, setApiKeysFilled] = useState(false);
  const [tradeMode, setTradeMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showDeployView, setShowDeployView] = useState(false);

  const getSymbols = async (tabData: any) => {
    let imageList = tabData.data
    let imageArray: any = []
    imageList.map((mapData: any) => {
      let isFound = symbolImages.find((item: any) => item.name == mapData.symbol)
      let isFoundImageArray = imageArray.find((item: any) => item == mapData.symbol)
      if (!isFound && !isFoundImageArray) {
        imageArray.push(mapData.symbol)
      }
    })
    if (imageArray.length > 0) {
      let params = {
        tickers: imageArray.toString()
      }
      try {
        let res = await postRequest(apiConstants.GET_SYMBOLS, params)
        if (!Array.isArray(res) && typeof (res) == 'object') {
          let symbolList: any = []
          Object.keys(res).map((key, i) => {
            symbolList.push({
              name: key,
              url: res[key]
            })
          })
          setSymbolImage(symbolImages.concat(symbolList))
        }
      } catch (e) {
      }
    }
  }

  const getMatricsData = async (tabData: any) => {
    const listData = tabData.data
    let strategyIds: any = []
    listData.map((mapData: any) => {
      let isFound = strategyIds.find((item: any) => item == mapData.vs_id)
      if (!isFound) {
        strategyIds.push(mapData.vs_id)
      }
    })

    if (strategyIds.length > 0) {
      getAverageMatrics(strategyIds)
        .then((res: any) => {
          if (!Array.isArray(res) && typeof (res) == 'object') {
            let averageMatricsList: any = []
            Object.keys(res).map((key, i) => {
              averageMatricsList.push({
                strategy_id: key,
                value: res[key]
              })
            })
            const updatedList = averageMatricsList.concat(averageMatrics)
            const uniqueList = _.uniqBy(updatedList, (item: any) => {
              return item.strategy_id
            })
            setAverageMatrics(uniqueList)
          }
        })
        .catch(err => console.log(err?.response));
    }
  }

  const getStrategies = (next_offset: number, isRefresh?: boolean, searchText?: string) => {
    setLoading(next_offset ? false : true)
    setFooterLoader(next_offset ? true : false)

    getStrategiesListData(user_id, selected, next_offset, searchText)
      .then((res) => {
        setLoading(false)
        setFooterLoader(false)
        setData(selected, res, isRefresh)
      })
      .catch(err => console.log(err))

  };

  const setData = (key: string, value: any, isRefresh?: boolean) => {
    const oldData = isRefresh ? null : strategies[key]?.data
    if (oldData && value) {
      const updatedData = oldData.concat(value.data)
      value.data = updatedData
    }
    setStrategies((prev: any) => ({ ...prev, [key]: value }));
    if (value?.data) {
      getSymbols(value)
      getMatricsData(value)
    }
    if (key == 'deploy' && value != null) {
      setStrategyId(value.strategy_id)
      setVsbUniqueKey(value.vsb_unique_key)
      setDocUrl(value.doc_url)
    }
    setShowBrokersList(false)
    setShowBrokersDetail(false)
    setApiKeysFilled(false)
    setTradeMode(false)
  };

  const getStrategiesData = (isRefresh?: boolean) => {
    setStrategies({
      Created: null,
      Copied: null,
      Forked: null,
      detail: null,
      deploy: null
    })
    getStrategies(0, isRefresh)
    setShowindex(null)
    setShowBrokersList(false)
    setShowBrokersDetail(false)
    setApiKeysFilled(false)
    setTradeMode(false)
  }

  useEffect(() => {
    setData('detail', null);
    setData('deploy', null);
    getStrategiesData()
    setSearchText('')
  }, [selected]);

  const onPagination = () => {
    if (strategies[selected]?.next_offset < strategies[selected]?.total_count && !footerLoader) {
      getStrategies(strategies[selected]?.next_offset, false, searchText)
    }
  }

  const refreshData = () => {
    getStrategiesData(true)
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

  const ListFooterComponent = () => {
    return (
      footerLoader ?
        <ActivityIndicator style={{ paddingVertical: normalize(20) }} color={Colors.red} />
        : null
    )
  }

  const reset = () => {
    setData('detail', null);
    setData('deploy', null);
  }

  const addOnList = (list) => {
    console.log("addOnList " + liveMode, list)
    setTimeout(() => {
      liveMode ? setShowBrokersList(true) : setShowDeployView(true)
    }, 500);
  }

  const selectedBroker = (broker) => {
    console.log(broker)
    setSelectedBroker(broker)
    setShowBrokersList(false)
    setTimeout(() => {
      setShowBrokersDetail(true)
    }, 500);
  }

  const apiKeysSaved = () => {
    setShowBrokersDetail(false)
    setTimeout(() => {
      setApiKeysFilled(true)
    }, 500);
  }

  const tradeModeSelected = (data) => {
    console.log(data)
    setApiKeysFilled(false)
    setTimeout(() => {
      setTradeMode(data)
    }, 500);

  }

  const strategyDeployed = () => {
    setData('detail', null);
    setData('deploy', null);
  }

  return (
    <Container
      containerStyle={strategyStyles.container}
      style={strategyStyles.innerContainer}>
      <Header style={{ width: '90%' }} />

      <View style={{ width: '80%', marginTop: normalize(20) }}>
        <AppTextInput
          placeholder="Search for a Strategy"
          value={searchText}
          onChangeText={(val: string) => {
            setSearchText(val)
            !val && getStrategiesData(true)
          }}
          type="search"
          onSearchPress={() => getStrategies(0, true, searchText)}
        />
      </View>

      <ToogleTabs
        options={options}
        selected={selected}
        setSelected={setSelected}
      />

      {strategies?.deploy ?
        !liveMode ?
          showDeployView ?
            <View style={strategyStyles.deployContainer}>
              <Deploy
                data={strategies?.deploy}
                setData={setData}
                user_id={user_id}
                refreshData={refreshData} />
            </View>
            :
            <StrategyAddOns
              addOnList={addOnList}
              strategyId={strategy_id}
              reset={reset} />
          : tradeMode ?
            <StrategyDeployConfirmation
              broker={broker}
              tradeMode={tradeMode}
              vsbKey={vsb_unique_key}
              strategyDeployed={strategyDeployed}
              reset={reset} />
            : apiKeysFilled ?
              <StrategyBrokerConfirmTradeMode
                broker={broker}
                tradeMode={tradeModeSelected}
                reset={reset} />
              : showBrokerDetail ?
                <StrategyBrokerDetailModal
                  broker={broker}
                  apiKeySaved={apiKeysSaved}
                  reset={reset} />
                : showBrokersList ?
                  <StrategyBrokerList
                    selectBroker={selectedBroker}
                    reset={reset} />
                  : <StrategyAddOns
                    addOnList={addOnList}
                    strategyId={strategy_id}
                    reset={reset} />
        : strategies?.detail ? (
          <View style={strategyStyles.orderContainer}>
            <StrategyItem
              item={strategies?.detail}
              selected
              order
              setData={setData}
              refreshData={refreshData}
            />
          </View>
        ) : loading ? (
          <Loader />
        ) : strategies[selected]?.data?.length > 0 ? (
          <FlatList
            data={strategies[selected].data}
            style={styles.listContainer}
            contentContainerStyle={styles.listContentContainer}
            onEndReached={onPagination}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            ItemSeparatorComponent={() => <View style={styles.seperatorView} />}
            renderItem={({ item, index }: { item: any; index: number }) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setShowindex(index)}>
                  <StrategyItem
                    item={item}
                    selected={index === showindex}
                    order={false}
                    setData={setData}
                    refreshData={refreshData}
                  />
                </TouchableOpacity>
              )
            }}
          />
        ) : (
          <EmptyStrategy />
        )
      }
      {strategies?.deploy && (
        <PrevButton
          onPress={() => setData('deploy', null)}
          style={commonStyles.prevBtn}
        />
      )}
    </Container>
  );
};

export default StrategiesScreen;

const styles = StyleSheet.create({
  pageViewContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: normalize(10),
    marginHorizontal: normalize(15)
  },
  pageBtnView: {
    width: normalize(30),
    height: normalize(30),
    justifyContent: 'center',
    marginRight: normalize(10),
    marginBottom: normalize(10),
    backgroundColor: Colors.grey
  },
  pageBtnText: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: normalize(16)
  },
  pageIcon: {
    alignSelf: 'center'
  },
  listContainer: {
    width: '100%',
    marginTop: normalize(20),
    paddingHorizontal: normalize(15),
    maxHeight: normalize(common.ScreenHeight * 0.6),
    minHeight: normalize(common.ScreenHeight * 0.57)
  },
  listContentContainer: {
    paddingTop: normalize(10),
    paddingBottom: normalize(30)
  },
  seperatorView: {
    height: normalize(15)
  },
  listHeaderContainer: {
    flexDirection: 'row',
    marginBottom: normalize(15),
    justifyContent: 'space-between'
  }
})
