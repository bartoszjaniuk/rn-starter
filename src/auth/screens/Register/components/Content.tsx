import { Box, Inline, Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Divider, Text } from 'src/shared';

import { Form } from './Form';
import { SocialIcons } from './SocialIcons';

import * as route from '../../../navigation/routes';

export const Content = () => {
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
  const handleSendEmail = () => {
    goTo(route.toAuthSentEmail);
  };

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content>
          <Stack space={12}>
            <Box width={150}>
              <Text fontWeight="700" size="heading">
                Załóż konto
              </Text>
            </Box>
            <Stack space={8}>
              <Form onSubmit={handleSendEmail} />
              <Divider />
              <SocialIcons />
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
