import React from 'react';

import { Image } from 'expo-image';
// import { Image } from 'react-native';
import * as Linking from 'expo-linking';

import { FloatBox, Stack } from '@grapp/stacks';

import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { useAuth } from 'src/providers/AuthContext';
import { Screen } from 'src/screen';
import { Button } from 'src/shared/components/Button';

import * as route from '../navigation/routes';

const navigateToActivateAccount = (event: { url: string }) => {
  const { queryParams } = Linking.parse(event.url);
  const token = queryParams?.token as string | undefined;
  const email = queryParams?.email as string | undefined;
  if (!token || !email) return;

  goTo(route.toAuthActivateAccount, { token, email });
};

const Content = () => {
  const { isLoading } = useAuth();

  const navigateToLoginScreen = () => goTo(route.toAuthLogin);
  const navigateToRegisterScreen = () => goTo(route.toAuthRegister);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      {/* <Screen.ScrollView  backgroundColor="transparent"> */}
      <Image
        source={require('../../../assets/images/pexel1.jpg')}
        style={{ width: '100%', height: '100%', opacity: 0.3, borderRadius: 16, marginTop: 40 }}
      />
      <FloatBox offset={0}>
        <Screen.Content alignX="center" alignY="center">
          <Image source={require('../../../assets/logo-transparent.png')} style={{ width: 200, height: 200 }} />
        </Screen.Content>
        <Screen.Footer>
          <Stack space={4} paddingBottom={10}>
            <Button onPress={navigateToLoginScreen}>Zaloguj</Button>
            <Button onPress={navigateToRegisterScreen}>Zarejestruj</Button>
          </Stack>
        </Screen.Footer>
      </FloatBox>
      {/* </Screen.ScrollView> */}
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
