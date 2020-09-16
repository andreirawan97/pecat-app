import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

import { PertaminaLogo } from '../../assets';
import { FrameView } from '../core-ui';

export default function SplashScene() {
  const [isPecatShow, setPecatShow] = useState(true);
  const [isTextShow, setTextShow] = useState(false);

  let animatedPecatOpacity = new Animated.Value(0);
  let animatedTextOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedPecatOpacity, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1000,
    }).start(() =>
      Animated.timing(animatedPecatOpacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 300,
      }).start(() => {
        setPecatShow(false);
        setTextShow(true);

        Animated.timing(animatedTextOpacity, {
          useNativeDriver: true,
          toValue: 1,
          duration: 500,
        }).start();
      }),
    );
  }, [animatedPecatOpacity, animatedTextOpacity]);

  let animatedPecatStyle = {
    opacity: animatedPecatOpacity,
  };
  let animatedTextStyle = {
    opacity: animatedTextOpacity,
  };

  return (
    <FrameView style={styles.container}>
      <Image source={PertaminaLogo} style={styles.pertaminaLogo} />

      {isPecatShow ? (
        <Animated.Text style={[styles.pecatText, animatedPecatStyle]}>
          P E C A T
        </Animated.Text>
      ) : null}

      {isTextShow ? (
        <Animated.Text style={[styles.text, animatedTextStyle]}>
          Pertamina Cek Gelombang Laut
        </Animated.Text>
      ) : null}
    </FrameView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pertaminaLogo: {
    width: 200,
    height: 200,
    marginBottom: 12,
  },
  pecatText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 26,
  },
});
