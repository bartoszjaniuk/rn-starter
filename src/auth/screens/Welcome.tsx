import React from 'react';
import { Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Button } from 'src/shared/components/Button';

import * as route from '../navigation/routes';

const AnotherComponent = () => {
  const navigateToLoginScreen = () => goTo(route.toAuthLogin);
  const navigateToRegisterScreen = () => goTo(route.toAuthRegister);

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content alignX="center" alignY="center" paddingTop={35}>
          <Image source={require('../../../assets/fitAppkaLogo.png')} width={10} height={10} />
        </Screen.Content>
      </Screen.ScrollView>
      <Screen.Footer>
        <Stack space={4} paddingBottom={10}>
          <Button onPress={navigateToLoginScreen}>Zaloguj</Button>
          <Button onPress={navigateToRegisterScreen}>Zarejestruj</Button>
        </Stack>
      </Screen.Footer>
    </>
  );
};

export const AuthWelcome = () => {
  return (
    <Screen
      statusBarStyle="light"
      BackgroundComponent={
        <LinearGradient
          // Background Linear Gradient
          colors={['#2E2E35', '#191A1E']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />
      }
    >
      <AnotherComponent />
    </Screen>
  );
};
