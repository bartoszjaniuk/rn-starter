import * as React from 'react';

import { SearchTrainersListNavigator } from 'src/activatedUser/navigation';
import { Screen } from 'src/screen';

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
  return <Screen.Navigator as={SearchTrainersListNavigator} data={initialQueryParamsList} />;
};
