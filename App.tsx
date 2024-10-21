import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/utils/navigation';
import Screen from './src/screen';
import TradeModal from './src/components/trade/TradeModal';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Screen />
          <Toast />
          <TradeModal />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
