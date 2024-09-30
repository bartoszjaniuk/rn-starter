import React from 'react';

import { Screen } from 'src/screen';

import { ActivateAccountForTrainerNavigator } from '../navigation/navigators';

const formInitialState = {
  name: '',
  surname: '',
  gender: '',
  city: '',
  description: '',
  trainingsPreference: [],
  photos: [],
};

export const FirstLoginTrainer = () => {
  return (
    <Screen
      HeaderComponent={
        <Screen.Header
          // dismissRoute={isInsideMyJobNavigator ? route.toMyJobDetails : route.toEmploymentCertificatesApply}
          as={Screen.Header.Progress}
        />
      }
    >
      <Screen.Navigator as={ActivateAccountForTrainerNavigator} data={formInitialState} />
    </Screen>
  );
};
