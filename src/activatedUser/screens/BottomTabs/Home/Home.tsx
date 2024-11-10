import React from 'react';
import { useStyles } from 'react-native-unistyles';

import { Box, Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, PressableScale, Text } from 'src/shared';

import * as route from '../../../navigation/routes';

const Content = () => {
  const { theme } = useStyles();
  const handleNavigateToSearchTrainers = () => goTo(route.toSearchTrainersList);
  return (
    <Screen.Content>
      <Stack space={2} width={50} align="center">
        <PressableScale style={{ width: 48, height: 48 }} onPress={handleNavigateToSearchTrainers}>
          <Box
            width={48}
            height={48}
            alignX="center"
            alignY="center"
            borderRadius={24}
            backgroundColor={theme.colors.primary}
          >
            <Icon name="plus" svgProps={{ width: 24, height: 24 }} color="typography" />
          </Box>
        </PressableScale>
        <Stack>
          <Text align="center" fontWeight="500" size="xs">
            Szukaj
          </Text>
          <Text align="center" fontWeight="500" size="xs">
            treningu
          </Text>
        </Stack>
      </Stack>
    </Screen.Content>
  );
};

export const BottomTabsHome = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
