import React, { ReactNode } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

type Props = {
  children: ReactNode;
  statusBarStyle?: 'auto' | 'inverted' | 'light' | 'dark';
  disableStatusBarPadding?: boolean;
} & ViewProps;

export default function FrameView(props: Props) {
  let { statusBarStyle, disableStatusBarPadding } = props;

  const statusBarHeight = disableStatusBarPadding
    ? 0
    : Constants.statusBarHeight;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        {...props}
        style={[styles.container, { marginTop: statusBarHeight }, props.style]}
      >
        {props.children}
        <StatusBar style={statusBarStyle} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});
