import * as React from 'react';

import { Inline, Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Text } from 'src/shared';

import { Form } from './Form';

import * as route from '../../../navigation/routes';

export const Content = () => {
  const handleNavigateToRegister = () => goTo(route.toAuthRegister);

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content>
          <Stack space={8}>
            <Stack>
              <Text fontWeight="700" size="heading">
                Miło Cię
              </Text>
              <Text fontWeight="700" size="heading">
                widzieć!
              </Text>
            </Stack>
            <Stack space={8}>
              <Form />
              {/* <Divider />
              <Inline space={15} alignX="center">
                <IconWrapper>
                  <Icon name="facebook" />
                </IconWrapper>
                <IconWrapper>
                  <Icon name="google" />
                </IconWrapper>
                <IconWrapper>
                  <Icon name="apple" color="white" />
                </IconWrapper>
              </Inline> */}
            </Stack>
          </Stack>
        </Screen.Content>
      </Screen.ScrollView>
      <Screen.Footer alignX="center" marginBottom={10}>
        <Inline space={2}>
          <Text fontWeight="400" size="sm">
            Nie masz konta?
          </Text>
          <Text fontWeight="700" size="sm" onPress={handleNavigateToRegister}>
            Zarejestruj się
          </Text>
        </Inline>
      </Screen.Footer>
    </>
  );
};
