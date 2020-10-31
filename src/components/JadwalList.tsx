import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { convertToDate } from '../helpers/unixTimestamp';
import { Schedule } from '../types/schedule';

type Props = {
  schedules?: Array<Schedule>;
};
export default function JadwalList(props: Props) {
  let { schedules } = props;

  return (
    <View style={styles.container}>
      {schedules?.map((schedule, i) => (
        <View key={i} style={styles.scheduleItemContainer}>
          <Text style={styles.siteNameText}>{schedule.site_name}</Text>
          <Text style={styles.dateText}>
            Mulai: {convertToDate(schedule.start_date)}
          </Text>
          <Text style={styles.dateText}>
            Selesai: {convertToDate(schedule.end_date)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scheduleItemContainer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  siteNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 2,
  },
});
