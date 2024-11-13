import React from 'react';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { PressableScale, Text } from 'src/shared';

import { Header } from './components/Header';
import { TrainersList } from './components/TrainerList';

import * as route from '../../../navigation/routes';

const Content = () => {
  return (
    <Screen.Content>
      <Header count={84} isSorted={false} />
      <TrainersList />
    </Screen.Content>
  );
};

export const SearchTrainersList = () => {
  const openFilters = () => goTo(route.toSearchTrainersFilters);
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
      statusBarStyle="light"
    >
      <Content />
    </Screen>
  );
};
