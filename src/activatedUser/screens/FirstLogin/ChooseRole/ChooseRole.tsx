import * as React from 'react';

import { Box, Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { useAuth } from 'src/providers/AuthContext';
import { Screen } from 'src/screen';
import { Text } from 'src/shared';
import { Button } from 'src/shared/components/Button';

import * as route from '../../../navigation/routes';

const Content = () => {
  const { onLogout, isLoading } = useAuth();
  const navigateToTrainee = () => goTo(route.toFirstLoginTrainee);
  const navigateToTrainer = () => goTo(route.toFirstLoginTrainer);

  return (
    <>
      <Box paddingX={7}>
        <Text fontWeight="700" size="heading">
          Jestem...
        </Text>
      </Box>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content alignY="center">
          <Stack space={12}>
            <Stack space={4}>
              <Button onPress={navigateToTrainee}>Trenującym</Button>
              <Button onPress={navigateToTrainer}>Trenerem</Button>
            </Stack>
          </Stack>
        </Screen.Content>
        <Screen.Footer>
          <Button isLoading={isLoading} color="primary" variant="inverted" onPress={onLogout}>
            Wyloguj
          </Button>
        </Screen.Footer>
      </Screen.ScrollView>
    </>
  );
};

export const FirstLoginChooseRole = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
