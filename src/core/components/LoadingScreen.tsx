import React from 'react';

import { Screen } from 'src/screen';
import { ActivityIndicator } from 'src/shared';

export const LoadingScreen = () => {
  return (
    <Screen>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content alignX="center" alignY="center">
          <ActivityIndicator />
        </Screen.Content>
      </Screen.ScrollView>
    </Screen>
  );
};
