import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { STORAGE_KEY } from '../constants/storageKey';
import { NavigationScreenProps } from '../types/navigation';

type Props = {} & NavigationScreenProps;
export default function InitialScene(props: Props) {
  let { navigation } = props;

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY.EMPLOYEE_INFO, (error, result) => {
      if (result) {
        navigation.replace('MainScene');
      } else {
        navigation.replace('AuthScene');
      }
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
