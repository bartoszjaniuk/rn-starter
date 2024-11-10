import React from 'react';

import { Box } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { Text } from 'src/shared';

const Content = () => {
  return (
    <Box>
      <Text>My Plans</Text>
    </Box>
  );
};

export const BottomTabsMyPlans = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
