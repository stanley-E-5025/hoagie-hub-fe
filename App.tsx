import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import {View} from 'react-native';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <View style={{flex: 1}}>
            <RootNavigator />
          </View>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
