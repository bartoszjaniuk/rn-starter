import * as React from 'react';

import { SearchTrainersListNavigator } from 'src/activatedUser/navigation';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { PressableScale, Text } from 'src/shared';

import * as route from '../../../navigation/routes';

export type QueryParamsList = {
  from?: string;
  to?: string;
  specialization?: string;
  gender?: string;
};

export const initialQueryParamsList: QueryParamsList = {
  from: '',
  to: '',
  specialization: '',
  gender: '',
};

export const SearchTrainersList = () => {
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
      <Screen.Navigator as={SearchTrainersListNavigator} data={initialQueryParamsList} />
    </Screen>
  );
};
