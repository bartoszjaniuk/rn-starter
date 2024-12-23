import * as React from 'react';

import { Screen } from 'src/screen';
import { Text } from 'src/shared';

const Content = () => {
  return (
    <Screen.Content>
      <Text>HomeTrainingDetails</Text>
    </Screen.Content>
  );
};

export const HomeTrainingDetails = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />}>
      <Content />
    </Screen>
  );
};
