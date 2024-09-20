import * as React from 'react';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { SelectDropdown, TextInput } from 'src/shared';

import * as route from '../../../../navigation/routes';
import { StepLayout } from '../../_internals/components';

const Content = () => {
  const handleNextPress = () => {
    goTo(route.toActivateAccountForTraineeTarget);
  };

  return (
    <StepLayout variant="Profile" buttonLabel="Dalej" shouldShowError={false} handleButtonClick={handleNextPress}>
      <TextInput isRequired={true} label="Imię" placeholder="Przedstaw się wszytkim" />
      <TextInput label="Nazwisko" placeholder="Dostępne tylko dla trenera" />
      <SelectDropdown
        label="Płeć"
        placeholder="Wybierz płeć"
        options={[
          { label: 'Męzczyzna', value: 'Męzczyzna' },
          { label: 'Kobieta', value: 'Kobieta' },
        ]}
      />
      <TextInput label="Miasto" placeholder="Gdzie chcesz trenować?" />
    </StepLayout>
  );
};

export const ActivateAccountForTraineeProfile = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
