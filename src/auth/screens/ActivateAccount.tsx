import React from 'react';

import { Box, Inline, Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Checkbox, Divider, IconWrapper, Text, TextInput } from 'src/shared';
import { Button } from 'src/shared/components/Button';

import AppleIcon from '../../../assets/icons/apple.svg';
import FacebookIcon from '../../../assets/icons/facebook.svg';
import GoogleIcon from '../../../assets/icons/google.svg';
import * as route from '../navigation/routes';

const Content = () => {
  Screen.useHeader({
    renderLeft: () => {
      return (
        <Screen.Header.Left>
          <Screen.Header.GoBackButton />
        </Screen.Header.Left>
      );
    },
  });

  const handleNavigateToLogin = () => goTo(route.toAuthRegister);

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content>
          <Stack space={14}>
            <Box>
              <Text fontWeight="700" size="heading">
                Wpisz hasło i aktywuj konto
              </Text>
            </Box>

            <Stack space={8}>
              <Stack space={6}>
                <TextInput label="Hasło" placeholder="*********" />
                <TextInput label="Powtórz hasło" placeholder="*********" />
                <Inline>
                  <Checkbox value={true} onValueChange={() => null}>
                    <Inline space={1}>
                      <Text fontWeight="500" size="sm" color="gray">
                        Akceptuję
                      </Text>
                      <Text fontWeight="900" size="sm" color="gray">
                        Regulamin
                      </Text>
                    </Inline>
                  </Checkbox>
                </Inline>
              </Stack>
              <Button>Zarejestruj</Button>
              <Divider />
              <Inline space={15} alignX="center">
                <IconWrapper>
                  <FacebookIcon />
                </IconWrapper>
                <IconWrapper>
                  <GoogleIcon />
                </IconWrapper>
                <IconWrapper>
                  <AppleIcon />
                </IconWrapper>
              </Inline>
            </Stack>
          </Stack>
        </Screen.Content>
      </Screen.ScrollView>
      <Screen.Footer alignX="center" marginBottom={10}>
        <Inline space={2}>
          <Text fontWeight="400" size="sm">
            Masz już konto?
          </Text>
          <Text fontWeight="700" size="sm" onPress={handleNavigateToLogin}>
            Zaloguj się
          </Text>
        </Inline>
      </Screen.Footer>
    </>
  );
};

export const AuthActivateAccount = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
