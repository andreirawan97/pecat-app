import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, Image, Animated, ActivityIndicator } from 'react-native';

import { PertaminaLogo } from '../../assets';
import { STORAGE_KEY } from '../constants/storageKey';
import { FrameView } from '../core-ui';
import { NavigationScreenProps } from '../types/navigation';

type Props = {} & NavigationScreenProps;

export default function SplashScene(props: Props) {
  let { navigation } = props;

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY.EMPLOYEE_INFO, (error, result) => {
      setTimeout(() => {
        if (result) {
          navigation.replace('MainScene');
        } else {
          navigation.replace('AuthScene');
        }
      }, 1000);
    });
  }, [navigation]);

  return (
    <FrameView style={styles.container}>
      <Image source={PertaminaLogo} style={styles.pertaminaLogo} />

      <Animated.Text
        style={[styles.text, { fontWeight: '300', marginBottom: 4 }]}
      >
        Pertamina Cek Gelombang Laut
      </Animated.Text>
      <Animated.Text style={styles.text}>PECAT</Animated.Text>

      <ActivityIndicator size="large" />
    </FrameView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  pertaminaLogo: {
    width: 200,
    height: 200,
    marginBottom: 12,
  },
  text: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
