import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FrameView } from '../core-ui';
import { NavigationScreenProps } from '../types/navigation';

type Props = {} & NavigationScreenProps;

export default function JadwalScene(props: Props) {
  let { color } = props.route.params as {
    color: string;
  };

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
