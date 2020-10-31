import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LOKASI_PERAIRAN } from '../data/lokasiTambang';

type Props = {
  onPressPerairan: (newCode: string) => void;
};
export default function PerairanSelection(props: Props) {
  let { onPressPerairan } = props;

  let [searchText, setSearchText] = useState('');
  let lokasiPerairan = searchText
    ? LOKASI_PERAIRAN.filter((lokasi) =>
        lokasi.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : LOKASI_PERAIRAN;

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Cari..."
          style={styles.textInput}
          onChangeText={setSearchText}
        />

        <View style={styles.iconContainer}>
          <Ionicons name="ios-search" size={20} />
        </View>
      </View>

      <ScrollView>
        {lokasiPerairan.map((lokasi, i) => (
          <TouchableOpacity
            key={i}
            style={styles.scheduleItemContainer}
            onPress={() => onPressPerairan(lokasi.code)}
          >
            <Text style={styles.siteNameText}>{lokasi.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  siteNameText: {
    fontSize: 20,
  },
  searchBarContainer: {
    borderWidth: 1,
    borderColor: 'silver',
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
  iconContainer: {
    paddingLeft: 8,
  },
});
