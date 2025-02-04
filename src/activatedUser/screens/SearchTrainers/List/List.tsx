import * as React from 'react';

import { Box } from '@grapp/stacks';

import { SearchTrainersListNavigator } from 'src/activatedUser/navigation';
import { Screen } from 'src/screen';

export type QueryParamsList = {
  from?: string;
  to?: string;
  specializations?: string;
  gender?: string;
};

export const initialQueryParamsList: QueryParamsList = {
  from: '',
  to: '',
  specializations: '',
  gender: '',
};

export const SearchTrainersList = () => {
  return (
    <Box flex="fluid" backgroundColor="#181A1E">
      <Screen.Navigator as={SearchTrainersListNavigator} data={initialQueryParamsList} />
    </Box>
  );
};
