import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';
import HoagieDetailScreen from '../screens/HoagieDetailScreen';
import {useAppSelector} from '../store/hooks';
import ErrorBoundary from '../components/ErrorBoundary';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {isAuthenticated} = useAppSelector(state => state.auth);

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'Main' : 'Auth'}
          screenOptions={{headerShown: false}}>
          {!isAuthenticated ? (
            <Stack.Screen name="Auth" component={AuthScreen} />
          ) : (
            <>
              <Stack.Screen name="Main" component={MainTabNavigator} />
              <Stack.Screen
                name="HoagieDetail"
                component={HoagieDetailScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default RootNavigator;
