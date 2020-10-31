import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import md5 from 'md5';

import { SunIcon } from '../../assets';
import { Button, TextInput } from '../components';
import { API_URL, ENDPOINTS } from '../config/network';
import { COLORS } from '../constants/colors';
import { STORAGE_KEY } from '../constants/storageKey';
import { FrameView } from '../core-ui';
import { NavigationScreenProps } from '../types/navigation';

type Props = {} & NavigationScreenProps;

export default function AuthScene(props: Props) {
  const [isFetching, setFetching] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onLoginPressed = async () => {
    setErrorMessage('');
    setFetching(true);
    if (email && password) {
      const URL = `${API_URL}${ENDPOINTS.LOGIN}`;

      let response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: md5(password),
        }),
      });
      let data = await response.json();
      if (data.success) {
        AsyncStorage.setItem(
          STORAGE_KEY.EMPLOYEE_INFO,
          JSON.stringify(data.employee),
          () => {
            props.navigation.replace('MainScene');
            setFetching(false);
          },
        );
      } else {
        setErrorMessage(data.info);
        setFetching(false);
      }
    } else {
      setErrorMessage('Field tidak boleh kosong!');
      setFetching(false);
    }
  };

  return (
    <FrameView
      style={styles.container}
      statusBarStyle="light"
      disableStatusBarPadding
    >
      <View style={styles.headerContainer}>
        <Image source={SunIcon} style={{ width: 120, height: 120 }} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Log in</Text>

        <TextInput
          label="Email"
          style={styles.textInput}
          labelStyle={styles.textInputLabel}
          containerStyle={styles.textInputContainer}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          style={styles.textInput}
          labelStyle={styles.textInputLabel}
          containerStyle={styles.textInputContainer}
          secureTextEntry={true}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        {errorMessage ? (
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        ) : null}

        {isFetching ? (
          <ActivityIndicator
            size="large"
            color={COLORS.PRIMARY}
            style={{
              marginTop: 12,
            }}
          />
        ) : (
          <Button
            onPress={onLoginPressed}
            title="Login"
            containerStyle={styles.loginButtonContainer}
          />
        )}
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
    color: 'black',
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
  errorMessageText: {
    fontSize: 16,
    color: COLORS.PRIMARY,
  },
});
