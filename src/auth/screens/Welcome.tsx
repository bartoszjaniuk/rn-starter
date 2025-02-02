import React from 'react';
import { Image } from 'react-native';

import * as Linking from 'expo-linking';

import { Stack } from '@grapp/stacks';

import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Button } from 'src/shared/components/Button';
import { useAuthStore } from 'src/store/auth';

import * as route from '../navigation/routes';

const navigateToActivateAccount = (event: { url: string }) => {
  const { queryParams } = Linking.parse(event.url);
  const token = queryParams?.token as string | undefined;
  const email = queryParams?.email as string | undefined;
  if (!token || !email) return;

  goTo(route.toAuthActivateAccount, { token, email });
};

const Content = () => {
  const { isLoading } = useAuthStore();

  const navigateToLoginScreen = () => goTo(route.toAuthLogin);
  const navigateToRegisterScreen = () => goTo(route.toAuthRegister);

  if (isLoading) return <LoadingScreen />;

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
  Linking.addEventListener('url', navigateToActivateAccount);

  return (
    <Screen statusBarStyle="light">
      <Content />
    </Screen>
  );
};
