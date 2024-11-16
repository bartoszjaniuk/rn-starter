import * as React from 'react';

import { CheckBoxListOptions, CheckboxList } from './CheckboxList';

const data: CheckBoxListOptions = [
  { key: 'genderWoman', value: 'woman', title: 'Kobieta' },
  { key: 'genderMan', value: 'man', title: 'Mężczyzna' },
];

type Props = {
  defaultValue?: string;
  onSelectGender: (from: string) => void;
};

export const GenderFilters = (props: Props) => {
  const { defaultValue, onSelectGender } = props;

  return (
    <CheckboxList
      defaultValue={data.find((d) => d.value === defaultValue)?.key}
      onSelect={onSelectGender}
      heading="Wybierz płeć"
      data={data}
    />
  );
};
