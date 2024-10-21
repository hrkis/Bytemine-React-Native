import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OrderBookScreen} from '../screens';
import ProfileScreen from '../screens/dashboard/ProfileScreen';
import VirtualFundsScreen from '../screens/dashboard/VirtualFundsScreen';
import CheckBalanceScreen from '../screens/dashboard/CheckBalanceScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';
import ReferScreen from '../screens/dashboard/ReferScreen';
import Reset from '../screens/auth/Reset';

const Stack = createStackNavigator();

const OrderBookNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderBook"
        component={OrderBookScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Virtual"
        component={VirtualFundsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Balance"
        component={CheckBalanceScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Refer"
        component={ReferScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Reset"
        component={Reset}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderBookNavigator;
