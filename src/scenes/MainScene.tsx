import React, { useRef } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';

import { BerawanIcon, RainImage } from '../../assets';
import { Button } from '../components';
import { FrameView } from '../core-ui';
import {
  getWeatherTextColor,
  getWeatherCelciusColor,
} from '../helpers/getWeatherColor';
import { NavigationScreenProps } from '../types/navigation';

type Props = {} & NavigationScreenProps;
export default function MainScene(props: Props) {
  const CURRENT_WEATHER = 'Berawan';

  let bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <FrameView style={styles.container}>
      <View style={{ flex: 2 }}>
        <Text style={styles.helloText}>Hello, Andre</Text>
        <Text
          style={[
            styles.weatherText,
            { color: getWeatherTextColor(CURRENT_WEATHER) },
          ]}
        >
          Berawan
        </Text>
        <Image source={BerawanIcon} style={{ width: 40, height: 40 }} />

        <Image
          source={RainImage}
          style={{
            width: '100%',
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.infoText}>Kategori Ombak: Sedang</Text>
          <Text style={styles.infoText}>Tinggi Ombak: 1.25 - 2.50 m</Text>
        </View>
        <Button
          title="Lihat Informasi Tambahan"
          onPress={() => {
            bottomSheetRef.current?.open();
          }}
          titleColor="white"
          backgroundColor={getWeatherTextColor(CURRENT_WEATHER)}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        closeOnDragDown
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 16,
          },
        }}
        height={Dimensions.get('window').height - 300}
        openDuration={250}
      >
        <ScrollView>
          <Text style={styles.headerText}>Informasi Tambahan</Text>

          <Text style={styles.paragraphText}>
            <Text style={{ fontWeight: 'bold' }}>Kategori Ombak: </Text>Sedang
          </Text>
          <Text style={styles.paragraphText}>
            <Text style={{ fontWeight: 'bold' }}>Tinggi Ombak: </Text>1.25 -
            2.50 m
          </Text>
          <Text style={styles.paragraphText}>
            <Text style={{ fontWeight: 'bold' }}>
              Kecepatan angin minimum:{' '}
            </Text>
            4 knot
          </Text>
          <Text style={styles.paragraphText}>
            <Text style={{ fontWeight: 'bold' }}>
              Kecepatan angin maksimum:{' '}
            </Text>
            20 knot
          </Text>
          <Text style={[styles.paragraphText, { fontWeight: 'bold' }]}>
            Angin berhembus dari arah Timur ke arah Selatan
          </Text>

          <View
            style={{ marginVertical: 20, height: 1, backgroundColor: 'black' }}
          />

          <Text style={styles.infoText}>
            Angin di wilayah Selat Sunda bagian Utara umumnya bertiup dari
            Selatan - Barat Daya dengan kecepatan 4 - 20 knot. Angin di wilayah
            Selat Sunda bagian Selatan umumnya bertiup dari Selatan - Barat Daya
            dengan kecepatan 4 - 20 knot. Angin di wilayah Perairan Selatan
            Banten umumnya bertiup dari Timur - Selatan dengan kecepatan 1 - 15
            knot. Angin di wilayah Samudera Hindia Selatan Banten umumnya
            bertiup dari Timur - Selatan dengan kecepatan 4 - 20 knot
          </Text>
          <Text style={styles.infoText}>
            Waspada gelombang laut dengan ketinggian 1.25 - 2.5 meter di wilayah
            Selat Sunda bagian Selatan, Perairan Selatan Banten dan Samudera
            Hindia Selatan Banten yang beresiko tinggi terhadap Perahu Nelayan
            dan Kapal Tongkang.
          </Text>
        </ScrollView>
      </BottomSheet>
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
  infoText: {
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 8,
    fontSize: 16,
  },
  paragraphText: {
    marginBottom: 8,
    fontSize: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
