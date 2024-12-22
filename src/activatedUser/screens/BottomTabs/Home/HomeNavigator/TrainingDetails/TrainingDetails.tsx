import * as React from 'react';

import { Screen } from 'src/screen';
import { Text } from 'src/shared';

const Content = () => {
  return <Text>HomeTrainingDetails</Text>;
};

export const HomeTrainingDetails = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
