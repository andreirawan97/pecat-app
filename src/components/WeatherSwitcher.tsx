import React, { useState, ReactElement } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import sanitizeDesc from '../helpers/sanitizeDesc';
import { WeatherInfo } from '../types/bmkg';

type Props = {
  weatherInfo: Array<WeatherInfo>;
  color: string;
};

export default function WeatherSwitcher(props: Props) {
  let { weatherInfo, color } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const HEADER = ['Hari Ini', 'Besok'];

  return (
    <View style={styles.container}>
      <View style={styles.headersContainer}>
        <ScrollView horizontal={true}>
          {HEADER.map((waktu, i) => {
            return i === selectedIndex ? (
              <TouchableOpacity
                key={i}
                style={styles.headerTextContainer}
                onPress={() => setSelectedIndex(i)}
              >
                <Text style={[styles.selectedHeaderText, { color }]}>
                  {waktu}
                </Text>
                <View
                  style={[
                    styles.selectedHeaderPointer,
                    { backgroundColor: color },
                  ]}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={i}
                style={styles.headerTextContainer}
                onPress={() => setSelectedIndex(i)}
              >
                <Text style={[styles.headerText, { color }]}>{waktu}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={{ flex: 1, marginTop: 12 }}>
        <ScrollView>
          <Text style={styles.paragraphText}>
            <Text style={{ fontWeight: 'bold' }}>Cuaca: </Text>
            {weatherInfo[selectedIndex].weather}
          </Text>
          <Text style={styles.paragraphText}>
            <Text style={{ fontWeight: 'bold' }}>Kategori Ombak: </Text>
            {weatherInfo[selectedIndex].wave_cat}
          </Text>
          <Text style={styles.paragraphText}>
            <Text style={{ fontWeight: 'bold' }}>Tinggi Ombak: </Text>
            {weatherInfo[selectedIndex].wave_desc}
          </Text>
          <Text style={styles.paragraphText}>
            <Text style={{ fontWeight: 'bold' }}>
              Kecepatan angin minimum:{' '}
            </Text>
            {weatherInfo[selectedIndex].wind_speed_min} knot
          </Text>
          <Text style={styles.paragraphText}>
            <Text style={{ fontWeight: 'bold' }}>
              Kecepatan angin maksimum:{' '}
            </Text>
            {weatherInfo[selectedIndex].wind_speed_max} knot
          </Text>
          <Text style={[styles.paragraphText, { fontWeight: 'bold' }]}>
            Angin berhembus dari arah {weatherInfo[selectedIndex].wind_from} ke
            arah {weatherInfo[selectedIndex].wind_to}
          </Text>

          <View
            style={{
              marginVertical: 20,
              height: 1,
              backgroundColor: 'black',
            }}
          />

          <Text style={styles.headerText}>Deskripsi Cuaca</Text>
          <Text style={styles.infoText}>
            {sanitizeDesc(weatherInfo[selectedIndex].weather_desc)}
          </Text>

          <Text style={styles.headerText}>Peringatan Cuaca</Text>
          <Text style={styles.infoText}>
            {sanitizeDesc(weatherInfo[selectedIndex].warning_desc)}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedHeaderText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedHeaderPointer: {
    height: 5,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  headerText: {
    color: '#3A405F',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerTextContainer: {
    marginRight: 24,
  },
  headersContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
  },
  paragraphText: {
    marginBottom: 8,
    fontSize: 16,
  },
  infoText: {
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 20,
    fontSize: 16,
  },
});
