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

import { Button, PerairanSelection, WeatherSwitcher } from '../components';
import { FrameView } from '../core-ui';
import getWeatherColor from '../helpers/getWeatherColor';
import getWeatherIcon from '../helpers/getWeatherIcon';
import getWeatherImage from '../helpers/getWeatherImage';
import sanitizeDesc from '../helpers/sanitizeDesc';
import { BMKGResponse, WeatherInfo } from '../types/bmkg';
import { NavigationScreenProps } from '../types/navigation';
import { Employee } from '../types/employee';
import { STORAGE_KEY } from '../constants/storageKey';
import { BMKG_API_URL } from '../config/network';
import { LOKASI_PERAIRAN } from '../data/lokasiTambang';
import findPerairanFromCode from '../helpers/findPerairanFromCode';

type Props = {} & NavigationScreenProps;
export default function MainScene(props: Props) {
  let [employeeInfo, setEmployeeInfo] = useState<Employee>();
  let [code, setCode] = useState('M.06');
  let [location, setLocation] = useState('');
  let [weatherInfo, setWeatherInfo] = useState<Array<WeatherInfo>>([
    {
      valid_from: '',
      valid_to: '',
      time_desc: '',
      weather: 'Cerah Berawan',
      weather_desc: '',
      warning_desc: '',
      station_remark: '',
      wave_cat: '',
      wave_desc: '',
      wind_from: '',
      wind_to: '',
      wind_speed_min: 0,
      wind_speed_max: 0,
    },
  ]);
  let [isMenuVisible, setMenuVisibility] = useState(false);

  let bottomSheetInfoRef = useRef<BottomSheet>(null);
  let bottomSheetLokasiRef = useRef<BottomSheet>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY.EMPLOYEE_INFO, async (err, result) => {
      if (result) {
        setEmployeeInfo(JSON.parse(result));

        const URL = `${BMKG_API_URL}${LOKASI_PERAIRAN[0].endpoint}`;
        let response = await fetch(URL, {
          method: 'GET',
        });
        let data = (await response.json()) as BMKGResponse;
        setWeatherInfo(data.data);
        setLocation(data.name);
      }
    });
  }, []);

  useEffect(() => {
    async function fetchPerairan() {
      const URL = `${BMKG_API_URL}${findPerairanFromCode(code)?.endpoint}`;
      let response = await fetch(URL, {
        method: 'GET',
      });
      let data = (await response.json()) as BMKGResponse;
      setWeatherInfo(data.data);
      setLocation(data.name);
      bottomSheetLokasiRef?.current?.close();
    }

    fetchPerairan();
  }, [code]);

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
              <TouchableOpacity
                style={styles.menuItemContainer}
                onPress={() => {
                  bottomSheetLokasiRef.current?.open();
                  setMenuVisibility(false);
                }}
              >
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
            { color: getWeatherColor(weatherInfo[0].weather) },
          ]}
        >
          {weatherInfo[0].weather}
        </Text>

        <Text
          style={[
            styles.lokasiPerairanText,
            { color: getWeatherColor(weatherInfo[0].weather) },
          ]}
        >
          {location}
        </Text>

        <Image
          source={getWeatherIcon(weatherInfo[0].weather)}
          style={{ width: 40, height: 40 }}
        />

        <Image
          source={getWeatherImage(weatherInfo[0].weather)}
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
          <Text style={styles.infoText}>
            Kategori Ombak: {weatherInfo[0].wave_cat}
          </Text>
          <Text style={styles.infoText}>
            Tinggi Ombak: {weatherInfo[0].wave_desc}
          </Text>
        </View>
        <Button
          title="Lihat Informasi Tambahan"
          onPress={() => {
            bottomSheetInfoRef.current?.open();
          }}
          titleColor="white"
          backgroundColor={getWeatherColor(weatherInfo[0].weather)}
          containerStyle={{ marginBottom: 12 }}
        />
        <Button
          title="Lihat Jadwal Kerja"
          onPress={() => {
            props.navigation.navigate('JadwalScene', {
              color: getWeatherColor(weatherInfo[0].weather),
            });
          }}
          titleColor="white"
          backgroundColor={getWeatherColor(weatherInfo[0].weather)}
          mode="outline"
        />
      </View>

      <BottomSheet
        ref={bottomSheetInfoRef}
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
        <WeatherSwitcher
          weatherInfo={weatherInfo}
          color={getWeatherColor(weatherInfo[0].weather)}
        />
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetLokasiRef}
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
          Dimensions.get('window').height * 0.3
        }
        openDuration={250}
        dragFromTopOnly={true}
      >
        <PerairanSelection
          onPressPerairan={(newCode) => {
            setCode(newCode);
          }}
        />
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
