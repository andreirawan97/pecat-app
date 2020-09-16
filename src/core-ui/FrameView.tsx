import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

type Props = {
  children: ReactNode;
} & ViewProps;

export default function FrameView(props: Props) {
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <View style={[styles.container, { marginTop: statusBarHeight }]} {...props}>
      {/* <StatusBar style="light" /> */}
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
