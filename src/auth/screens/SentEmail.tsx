import React from 'react';

import { Box, Inline, Stack } from '@grapp/stacks';

import { useRouteParams } from 'src/core/hooks';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Badge, Text } from 'src/shared';

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

  const handleNavigateToActivateAccount = () => goTo(route.toAuthActivateAccount);

  const params = useRouteParams(route.toAuthSentEmail);

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content>
          <Stack space={12}>
            <Box width={286}>
              <Text fontWeight="700" size="heading">
                Wejdź na maila i aktywuj konto!
              </Text>
            </Box>

            <Stack space={6}>
              <Text fontWeight="400" size="md">
                Wiadomość z linkiem aktywacyjnym została przesłana na podany email:
              </Text>
              <Badge>
                <Text fontWeight="700" size="lg" color="primary">
                  {params.email || 'twojemail@mail.pl'}
                </Text>
              </Badge>
            </Stack>
          </Stack>
        </Screen.Content>
      </Screen.ScrollView>
      <Screen.Footer alignX="center" marginBottom={10}>
        <Inline space={2}>
          <Text fontWeight="400" size="sm">
            Wiadomość nie dotarła?
          </Text>
          <Text fontWeight="700" size="sm" onPress={handleNavigateToActivateAccount}>
            Wyślij ponownie
          </Text>
        </Inline>
      </Screen.Footer>
    </>
  );
};

export const AuthSentEmail = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
