import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScene from '../scenes/SplashScene';
import AuthScene from '../scenes/AuthScene';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SplashScene" component={SplashScene} />
        <Stack.Screen name="AuthScene" component={AuthScene} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
