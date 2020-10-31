import React from 'react';
import {
  View,
  TextInput as RawTextInput,
  TextInputProps,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { COLORS } from '../constants/colors';

type Props = {
  label?: string;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
} & TextInputProps;

export default function TextInput(props: Props) {
  let { label, containerStyle, labelStyle } = props;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.textInputContainer}>
        <RawTextInput {...props} style={[styles.textInput, props.style]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
  },
  label: {
    color: '#3A405F',
    marginBottom: 8,
    fontSize: 21,
  },
  textInputContainer: {
    backgroundColor: 'rgba(254, 170, 134, 0.28)',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderColor: 'rgba(254, 170, 134, 0.28)',
    borderRadius: 12,
  },
  textInput: {
    fontSize: 21,
  },
});
