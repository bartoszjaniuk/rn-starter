import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';

import { Box, FloatBox, Inline, Stack } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { Divider, Text, TextInput } from 'src/shared';
import { Button } from 'src/shared/components/Button';

import { SocialIcon } from './Login/components';

import AppleIcon from '../../../assets/icons/apple.svg';
import FacebookIcon from '../../../assets/icons/facebook.svg';
import GoogleIcon from '../../../assets/icons/google.svg';

const AnotherComponent = () => {
  Screen.useHeader({
    renderLeft: () => {
      return (
        <Screen.Header.Left>
          <Screen.Header.GoBackButton />
        </Screen.Header.Left>
      );
    },
  });

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content>
          <Stack space={16}>
            <Box width={150}>
              <Text fontWeight="700" size="heading">
                Miło Cię widzieć!
              </Text>
            </Box>

            <Stack space={8}>
              <Stack space={6}>
                <TextInput label="Email" placeholder="twójmail@gmail.com" />
                <TextInput label="Hasło" placeholder="*********" secureTextEntry={true} multiline={false} />
                <Inline alignX="right">
                  <Text color="gray" size="sm" fontWeight="500">
                    Nie pamiętasz hasła?
                  </Text>
                </Inline>
              </Stack>
              <Button>Zaloguj</Button>
              <Divider />
              <Inline space={15} alignX="center">
                <SocialIcon>
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon>
                  <GoogleIcon />
                </SocialIcon>
                <SocialIcon>
                  <AppleIcon />
                </SocialIcon>
              </Inline>
            </Stack>
          </Stack>
        </Screen.Content>
      </Screen.ScrollView>
      <Screen.Footer alignX="center" marginBottom={10}>
        <Inline space={2}>
          <Text fontWeight="400" size="sm">
            Nie masz konta?
          </Text>
          <Text fontWeight="700" size="sm">
            Zarejestruj się
          </Text>
        </Inline>
      </Screen.Footer>
    </>
  );
};

export const AuthLogin = () => {
  return (
    <Screen
      HeaderComponent={<Screen.Header variant="transparent" />}
      statusBarStyle="light"
      BackgroundComponent={
        <FloatBox height="100%" top={0} left={0} right={0} bottom={0} backgroundColor={'#181A1E'}>
          <LinearGradient colors={['#181A1E', '#181A1E']} start={[0, 0]} end={[0, 1]} style={{ flex: 1 }} />
          <LinearGradient colors={['#2E2E35', '#191A1E']} start={[0, 1]} end={[0, 0]} style={{ flex: 1 }} />
        </FloatBox>
      }
    >
      <AnotherComponent />
    </Screen>
  );
};
