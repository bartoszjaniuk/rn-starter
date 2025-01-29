import * as React from 'react';

import { Box } from '@grapp/stacks';

import { HomeNavigator } from 'src/activatedUser/navigation';
import { Screen } from 'src/screen';

export const BottomTabsHome = () => {
  return (
    <Box flex="fluid" backgroundColor="#181A1E">
      <Screen.Navigator as={HomeNavigator} data={undefined} />
    </Box>
  );
};
