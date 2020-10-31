import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScene from '../scenes/AuthScene';
import MainScene from '../scenes/MainScene';
import JadwalScene from '../scenes/JadwalScene';
import InitialScene from '../scenes/InitialScene';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="InitialScene">
        <Stack.Screen name="InitialScene" component={InitialScene} />
        <Stack.Screen name="AuthScene" component={AuthScene} />
        <Stack.Screen name="MainScene" component={MainScene} />
        <Stack.Screen name="JadwalScene" component={JadwalScene} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
