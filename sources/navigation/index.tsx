import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { RootStackParamList } from '../../types';
import { LoginScreen } from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';

const isAuthorized = false

export const Navigation = () => {
  return (
    <NavigationContainer>
      {isAuthorized ? <RootNavigator />  : <LoginScreen />}
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false } } mode='modal'>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default Navigation
