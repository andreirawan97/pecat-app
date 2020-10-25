import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScene from '../scenes/SplashScene';
import AuthScene from '../scenes/AuthScene';
import MainScene from '../scenes/MainScene';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const AuthStackNavigator = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SplashScene" component={SplashScene} />
      <Stack.Screen name="AuthScene" component={AuthScene} />
    </Stack.Navigator>
  );

  const MainStackNavigator = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainScene" component={MainScene} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
