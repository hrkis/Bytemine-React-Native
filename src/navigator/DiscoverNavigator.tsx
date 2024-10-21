import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from '../screens/discover/DiscoverScreen';
import { ScreenNames } from './ScreenNames';
import CustomWebView from '../screens/discover/CustomWebView';

const Stack = createStackNavigator();

const DiscoverNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name={ScreenNames.DISCOVER_SCREEN}
        component={DiscoverScreen} />

      <Stack.Screen
        name={ScreenNames.CUSTOM_WEB_VIEW_SCREEN}
        component={CustomWebView} />

    </Stack.Navigator>
  )
}

export default DiscoverNavigator
