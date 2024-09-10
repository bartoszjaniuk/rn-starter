import React from 'react';

import { Screen } from 'src/screen';

import { ActivateAccountForTraineeNavigator } from '../navigation/navigators';

const formInitialState = {
  name: '',
  surname: '',
  gender: '',
  city: '',
  trainingsPreference: [],
  photos: [],
};

export const FirstLoginTrainee = () => {
  return (
    <Screen
      HeaderComponent={
        <Screen.Header
          // dismissRoute={isInsideMyJobNavigator ? route.toMyJobDetails : route.toEmploymentCertificatesApply}
          as={Screen.Header.Progress}
        />
      }
    >
      <Screen.Navigator as={ActivateAccountForTraineeNavigator} data={formInitialState} />
    </Screen>
  );
};
