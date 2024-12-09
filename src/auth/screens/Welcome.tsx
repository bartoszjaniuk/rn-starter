import React from 'react';
import { Image } from 'react-native';

import * as Linking from 'expo-linking';

import { Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Button } from 'src/shared/components/Button';

import * as route from '../navigation/routes';

const navigateToActivateAccount = (event: { url: string }) => {
  const { queryParams } = Linking.parse(event.url);
  const token = queryParams?.token as string | undefined;
  if (!token) return;

  goTo(route.toAuthActivateAccount, { token });
};

const Content = () => {
  const navigateToLoginScreen = () => goTo(route.toAuthLogin);
  const navigateToRegisterScreen = () => goTo(route.toAuthRegister);

  Linking.addEventListener('url', navigateToActivateAccount);

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content alignX="center" alignY="center" paddingTop={35}>
          <Image source={require('../../../assets/logo-transparent.png')} width={10} height={10} />
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
    <Screen statusBarStyle="light">
      <Content />
    </Screen>
  );
};
