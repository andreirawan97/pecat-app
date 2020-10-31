import React from 'react';
import { StyleSheet, Image, Animated } from 'react-native';

import { PertaminaLogo } from '../../assets';
import { FrameView } from '../core-ui';
import { NavigationScreenProps } from '../types/navigation';

type Props = {} & NavigationScreenProps;

export default function SplashScene(props: Props) {
  return (
    <FrameView style={styles.container}>
      <Image source={PertaminaLogo} style={styles.pertaminaLogo} />

      <Animated.Text style={styles.text}>
        Pertamina Cek Gelombang Laut
      </Animated.Text>
      <Animated.Text style={styles.text}>(PECAT)</Animated.Text>
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
  },
});
