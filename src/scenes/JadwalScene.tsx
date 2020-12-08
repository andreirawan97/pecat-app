import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import { FrameView } from '../core-ui';
import { JadwalList, Loading } from '../components';
import { NavigationScreenProps } from '../types/navigation';
import { Schedule } from '../types/schedule';
import { STORAGE_KEY } from '../constants/storageKey';
import { API_URL, ENDPOINTS } from '../config/network';
import { Employee } from '../types/employee';

type Props = {} & NavigationScreenProps;

export default function JadwalScene(props: Props) {
  const [schedules, setSchedules] = useState<Array<Schedule>>();
  const [isFetching, setFetching] = useState(true);

  let { color } = props.route.params as {
    color: string;
  };

  useEffect(() => {
    // Ambil dari storage employee info, kemudian pangggil get schedule yang dimana ngirim uid employee.
    AsyncStorage.getItem(STORAGE_KEY.EMPLOYEE_INFO, async (err, result) => {
      if (result) {
        const employee = JSON.parse(result) as Employee;
        const URL = `${API_URL}${ENDPOINTS.GET_SCHEDULE}`;

        let response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: employee.uid,
          }),
        });
        let data = await response.json();

        setSchedules(data.response);
        setFetching(false);
      }
    });
  }, []);

  return (
    <FrameView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginRight: 18 }}
          onPress={props.navigation.goBack}
        >
          <Ionicons name="ios-arrow-back" size={42} color={color} />
        </TouchableOpacity>

        <Text style={[styles.jadwalText, { color }]}>Jadwal Kerja</Text>
      </View>

      <View style={{ flex: 1 }}>
        {isFetching ? (
          <Loading color={color} />
        ) : (
          <ScrollView>
            <JadwalList schedules={schedules} />
          </ScrollView>
        )}
      </View>
    </FrameView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  jadwalText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
