import * as React from 'react';

import { ActivateAccountTraineeNavigator } from 'src/activatedUser/navigation';
import { Screen } from 'src/screen';

export type QueryParamsList = {
  from?: string;
  to?: string;
  specialization?: string;
  gender?: string;
};

const formInitialState: QueryParamsList = {
  from: '',
  to: '',
  specialization: '',
  gender: '',
};

export const SearchTrainersHome = () => {
  return (
    <Screen
      HeaderComponent={
        <Screen.Header
          // dismissRoute={isInsideMyJobNavigator ? route.toMyJobDetails : route.toEmploymentCertificatesApply}
          as={Screen.Header.Progress}
        />
      }
    >
      <Screen.Navigator as={ActivateAccountTraineeNavigator} data={formInitialState} />
    </Screen>
  );
};
