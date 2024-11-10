import React from 'react';

import { Screen } from 'src/screen';
import { PressableScale, Text } from 'src/shared';

import { Header } from './components/Header';
import { TrainersList } from './components/TrainerList';

const Content = () => {
  return (
    <Screen.Content>
      <Header count={84} isSorted={false} />
      <TrainersList />
    </Screen.Content>
  );
};

export const SearchTrainersList = () => {
  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="primary">
          <Screen.Header.Right>
            <PressableScale>
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
