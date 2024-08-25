import React from 'react';
import { Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Stack } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { Button } from 'src/shared/components/Button';

const AnotherComponent = () => {
  Screen.useHeader({
    renderLeft: () => (
      <Screen.Header.Left>
        <Screen.Header.GoBackButton variant="primary" />
      </Screen.Header.Left>
    ),
  });

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content alignX="center" alignY="center" paddingTop={35}>
          <Text>Register</Text>
        </Screen.Content>
      </Screen.ScrollView>
      <Screen.Footer>
        <Stack space={4} paddingBottom={10}>
          <Button>Zaloguj</Button>
          <Button>Zarejestruj</Button>
        </Stack>
      </Screen.Footer>
      <Screen.Header.Host />
    </>
  );
};

export const AuthRegister = () => {
  return (
    <Screen
      statusBarStyle="light"
      HeaderComponent={<Screen.Header variant="hosted" />}
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
