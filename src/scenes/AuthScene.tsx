import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { SunIcon } from '../../assets';
import { Button, TextInput } from '../components';
import { COLORS } from '../constants/colors';
import { FrameView } from '../core-ui';
import { NavigationScreenProps } from '../types/navigation';

type Props = {} & NavigationScreenProps;

export default function AuthScene(props: Props) {
  return (
    <FrameView style={styles.container} statusBarStyle="light">
      <View style={styles.headerContainer}>
        <Image source={SunIcon} style={{ width: 120, height: 120 }} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Log in</Text>

        <TextInput
          label="Username"
          style={styles.textInput}
          labelStyle={styles.textInputLabel}
          containerStyle={styles.textInputContainer}
        />
        <TextInput
          label="Password"
          style={styles.textInput}
          labelStyle={styles.textInputLabel}
          containerStyle={styles.textInputContainer}
          secureTextEntry={true}
        />

        <Button
          onPress={() => {}}
          title="Login"
          containerStyle={styles.loginButtonContainer}
        />
      </View>
    </FrameView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    padding: 42,
  },
  textInputContainer: {
    marginBottom: 32,
  },
  textInput: {
    color: 'white',
  },
  textInputLabel: {
    fontWeight: 'bold',
  },
  loginButtonContainer: {
    marginTop: 12,
  },
  loginText: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
});
