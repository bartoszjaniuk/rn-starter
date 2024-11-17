import React from 'react';

import { ActivateAccountTrainerNavigator } from 'src/activatedUser/navigation';
import { Screen } from 'src/screen';

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
          variant="transparent"
        />
      }
    >
      <Screen.Navigator as={ActivateAccountTrainerNavigator} data={formInitialState} />
    </Screen>
  );
};
