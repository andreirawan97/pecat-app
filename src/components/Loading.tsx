import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = { color?: string };
export default function Loading(props: Props) {
  let { color } = props;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
