import * as React from 'react';

import { Screen } from 'src/screen';
import { SelectDropdown, TextInput } from 'src/shared';

import { StepLayout } from '../../_internals/components';

const Content = () => {
  return (
    <StepLayout variant="Profile" buttonLabel="Dalej" shouldShowError={false} handleButtonClick={() => null}>
      <TextInput isRequired={true} label="Imię" placeholder="Przedstaw się wszytkim" />
      <TextInput label="Nazwisko" placeholder="Dostępne tylko dla trenera" />
      {/* <TextInput label="Wybierz płeć" placeholder="Dostępne tylko dla trenera" /> */}
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
