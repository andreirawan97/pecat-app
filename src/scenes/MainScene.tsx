import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import { Button } from '../components';
import { FrameView } from '../core-ui';
import getWeatherColor from '../helpers/getWeatherColor';
import getWeatherIcon from '../helpers/getWeatherIcon';
import getWeatherImage from '../helpers/getWeatherImage';
import sanitizeDesc from '../helpers/sanitizeDesc';
import { Weather } from '../types/bmkg';
import { NavigationScreenProps } from '../types/navigation';
import { Employee } from '../types/employee';
import { STORAGE_KEY } from '../constants/storageKey';

type Props = {} & NavigationScreenProps;
export default function MainScene(props: Props) {
  let [employeeInfo, setEmployeeInfo] = useState<Employee>();
  let [isMenuVisible, setMenuVisibility] = useState(false);

  const CURRENT_WEATHER: Weather = 'Hujan Badai';
  const WEATHER_DESC =
    'Angin di wilayah Selat Sunda bagian Utara umumnya bertiup dari Timur - Selatan dengan kecepatan 2 - 20 knot. Angin di wilayah Selat Sunda bagian Selatan umumnya bertiup dari Timur - Selatan dengan kecepatan 1 - 20 knot. Angin di wilayah Perairan Selatan Banten umumnya bertiup dari Timur - Selatan dengan kecepatan 1 - 15 knot. Angin di wilayah Samudera Hindia Selatan Banten umumnya bertiup dari Timur - Tenggara dengan kecepatan 1 - 15 knot.<br />\n&nbsp;';
  const WARNING_DESC =
    'Waspada gelombang laut dengan ketinggian 4.0 - 6.0 meter di wilayah Selat Sunda bagian Selatan,&nbsp;Perairan Selatan Banten&nbsp;dan Samudera Hindia Selatan Banten yang beresiko tinggi terhadap semua jenis Kapal.';

  let bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY.EMPLOYEE_INFO, (err, result) => {
      if (result) {
        setEmployeeInfo(JSON.parse(result));
      }
    });
  }, []);

  return (
    <FrameView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          zIndex: 1,
        }}
      >
        <Text style={styles.helloText} numberOfLines={1}>
          Hello, {employeeInfo?.name}
        </Text>

        <View>
          <TouchableOpacity
            onPress={() => {
              setMenuVisibility(!isMenuVisible);
            }}
          >
            <Entypo name="dots-three-vertical" size={24} />
          </TouchableOpacity>
          {isMenuVisible ? (
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItemContainer}>
                <Text>Pilih Lokasi Tambang</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItemContainer}
                onPress={() => {
                  AsyncStorage.clear(() => {
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'AuthScene' }],
                    });
                  });
                }}
              >
                <Text style={{ color: 'red' }}>Keluar</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={[
            styles.weatherText,
            { color: getWeatherColor(CURRENT_WEATHER) },
          ]}
        >
          {CURRENT_WEATHER}
        </Text>

        <Text
          style={[
            styles.lokasiPerairanText,
            { color: getWeatherColor(CURRENT_WEATHER) },
          ]}
        >
          Perairan Samarinda - Bontang
        </Text>

        <Image
          source={getWeatherIcon(CURRENT_WEATHER)}
          style={{ width: 40, height: 40 }}
        />

        <Image
          source={getWeatherImage(CURRENT_WEATHER)}
          style={{
            flex: 1,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginBottom: 8,
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
          backgroundColor={getWeatherColor(CURRENT_WEATHER)}
          containerStyle={{ marginBottom: 12 }}
        />
        <Button
          title="Lihat Jadwal Kerja"
          onPress={() => {
            props.navigation.navigate('JadwalScene', {
              color: getWeatherColor(CURRENT_WEATHER),
            });
          }}
          titleColor="white"
          backgroundColor={getWeatherColor(CURRENT_WEATHER)}
          mode="outline"
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
        height={
          Dimensions.get('window').height -
          Dimensions.get('window').height * 0.15
        }
        openDuration={250}
        dragFromTopOnly={true}
      >
        <ScrollView>
          <TouchableWithoutFeedback style={{ flex: 1 }}>
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
              style={{
                marginVertical: 20,
                height: 1,
                backgroundColor: 'black',
              }}
            />

            <Text style={styles.infoText}>{sanitizeDesc(WEATHER_DESC)}</Text>
            <Text style={styles.infoText}>{sanitizeDesc(WARNING_DESC)}</Text>
          </TouchableWithoutFeedback>
        </ScrollView>
      </BottomSheet>
    </FrameView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  helloText: {
    fontSize: 23,
    marginBottom: 8,
  },
  weatherText: {
    fontSize: 36,
  },
  lokasiPerairanText: {
    fontSize: 18,
    marginBottom: 8,
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
  menuContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 30,
    right: 0,
    width: 180,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  menuItemContainer: {
    paddingLeft: 12,
    paddingVertical: 12,
  },
});
