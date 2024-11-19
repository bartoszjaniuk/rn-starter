import * as React from 'react';

import { ActivateAccountTraineeNavigator } from '../../../../activatedUser/navigation/navigators';
import { Screen } from '../../../../screen';

export type TraineeFormData = {
  name: string;
  surname: string;
  gender: string;
  phoneNumber: string;
  city: string;
  specializations: string[];
  role: string;
  photos?: string[];
};

const formInitialState: TraineeFormData = {
  name: '',
  surname: '',
  phoneNumber: '2137',
  gender: '',
  city: '',
  specializations: [],
  role: 'trainee',
  photos: [],
};

export const FirstLoginTrainee = () => {
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
      <Screen.Navigator as={ActivateAccountTraineeNavigator} data={formInitialState} />
    </Screen>
  );
};
