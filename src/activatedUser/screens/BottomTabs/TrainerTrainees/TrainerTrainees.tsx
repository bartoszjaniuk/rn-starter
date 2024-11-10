import React from 'react';

import { Box } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { Text } from 'src/shared';

const Content = () => {
  return (
    <Box>
      <Text>TrainerTrainees</Text>
    </Box>
  );
};

export const BottomTabsTrainerTrainees = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
