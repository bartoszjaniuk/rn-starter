import React from 'react';

import { Screen } from 'src/screen';

import { ActivateAccountForTrainerNavigator } from '../navigation/navigators';

export type TrainerFormData = {
  name: string;
  surname: string;
  gender: string;
  phoneNumber: string;
  city: string;
  specializations: string[];
  role: string;
  description: string;
  photos?: string[];
};

const formInitialState: TrainerFormData = {
  name: '',
  surname: '',
  description: '',
  phoneNumber: '2137',
  gender: '',
  city: '',
  specializations: [],
  role: 'trainer',
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
