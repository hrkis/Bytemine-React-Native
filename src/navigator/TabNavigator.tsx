import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { OrderBookScreen } from '../screens';
import { configureNotification } from '../utils/notification';
import { Colors } from '../utils/colors';
import CustomTab from '../components/common/CustomTab';
import StrategiesNavigator from './StrategiesNavigator';
import { getAggregatedStats } from '../services/strategiesService';
import { setFirst, setStats } from '../redux/data/actions';
import store from '../redux/store';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { BackHandler, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import DiscoverNavigator from './DiscoverNavigator';
import { ScreenNames } from './ScreenNames';

const Tab = createBottomTabNavigator();

export const getStats = () => {
  getAggregatedStats(
    (store.getState() as any)?.user?.user_id ??
    (store.getState() as any)?.user?.u_id,
  )
    .then((res: any) => {
      setStats(res);
    })
    .catch(err => console.log(err));
};

const TabNavigators = () => {
  const user = useSelector((state: any) => state?.user);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotification.requestPermissions()
        .then(() => configureNotification())
        .catch(err => console.log(err));
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  });

  useEffect(() => {
    configureNotification();
    getStats();
    setFirst(false);
  }, []);

  return (
    <Tab.Navigator
      tabBar={props => <CustomTab {...props} />}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: Colors.white,
        tabBarStyle: {
          backgroundColor: Colors.black,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name={ScreenNames.STRATEGIES_STACK}
        component={StrategiesNavigator}
        options={{
          tabBarLabel: 'Strategies',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.DISCOVER_STACK}
        component={DiscoverNavigator}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.ORDER_SCREEN}
        component={OrderBookScreen}
        options={{
          tabBarLabel: 'OrderBook',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigators;
