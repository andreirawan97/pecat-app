import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RainImage } from '../../assets';

import { FrameView } from '../core-ui';
import {
  getWeatherTextColor,
  getWeatherCelciusColor,
} from '../helpers/getWeatherColor';
import { NavigationScreenProps } from '../types/navigation';

type Props = {} & NavigationScreenProps;
export default function MainScene(props: Props) {
  const CURRENT_WEATHER = 'rain';

  return (
    <FrameView style={styles.container}>
      <Text style={styles.helloText}>Hello, Andre</Text>
      <Text
        style={[
          styles.weatherText,
          { color: getWeatherTextColor(CURRENT_WEATHER) },
        ]}
      >
        RAIN
      </Text>
      <Text
        style={[
          styles.celciusText,
          { color: getWeatherCelciusColor(CURRENT_WEATHER) },
        ]}
      >
        29°C
      </Text>

      <Image
        source={RainImage}
        style={{
          width: '100%',
        }}
      />
    </FrameView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  helloText: {
    fontSize: 23,
    marginBottom: 8,
  },
  weatherText: {
    fontSize: 36,
    marginBottom: 8,
  },
  celciusText: {
    fontSize: 28,
    marginBottom: 12,
  },
});
