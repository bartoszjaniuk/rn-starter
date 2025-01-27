import React from 'react';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { PressableScale, Text } from 'src/shared';

import { TrainersList } from './components/TrainerList';

import * as route from '../../../../navigation/routes';

const Content = () => {
  return (
    <Screen.Content>
      <TrainersList />
    </Screen.Content>
  );
};
export const SearchTrainersListList = () => {
  const openFilters = () => goTo(route.toSearchTrainersListFilters);

  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="primary">
          <Screen.Header.Right>
            <PressableScale onPress={openFilters}>
              <Text fontWeight="700" size="xs" color="primary">
                Filtruj
              </Text>
            </PressableScale>
          </Screen.Header.Right>
        </Screen.Header>
      }
    >
      <Content />
    </Screen>
  );
};
