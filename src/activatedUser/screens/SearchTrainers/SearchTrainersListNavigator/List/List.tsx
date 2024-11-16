import React from 'react';

import { Screen } from 'src/screen';

import { TrainersList } from './components/TrainerList';

const Content = () => {
  return (
    <Screen.Content>
      <TrainersList />
    </Screen.Content>
  );
};
export const SearchTrainersListList = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
