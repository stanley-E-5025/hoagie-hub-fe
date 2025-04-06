import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedTabScreen from '../screens/FeedTabScreen';
import CreateTabScreen from '../screens/CreateTabScreen';
import ProfileTabScreen from '../screens/ProfileTabScreen';
import {MainTabParamList} from './types';
import {COLORS} from '../constants/styles';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text.tertiary,
        headerShown: false,
        tabBarStyle: {
          borderTopColor: COLORS.border,
        },
      }}>
      <Tab.Screen name="FeedTab" component={FeedTabScreen} />
      <Tab.Screen name="CreateTab" component={CreateTabScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileTabScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
