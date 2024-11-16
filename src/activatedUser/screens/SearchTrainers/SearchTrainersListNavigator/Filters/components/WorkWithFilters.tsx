import * as React from 'react';

import { CheckBoxListOptions, CheckboxList } from './CheckboxList';

const today = new Date().toISOString().slice(0, 10);

const data: CheckBoxListOptions = [
  { key: 'trainersIWorkedWith', value: today, title: 'Trenerów z którymi ćwiczyłem' },
  { key: 'trainersIdidNotWorkedWith', value: today, title: 'Trenerów z innych lokalizacji' },
];

type Props = {
  defaultValue?: string;
  onSelectFrom: (from: string) => void;
};

export const WorkWithFilters = (props: Props) => {
  const { defaultValue, onSelectFrom } = props;

  return (
    <CheckboxList
      defaultValue={data.find((d) => d.value === defaultValue)?.key}
      onSelect={onSelectFrom}
      heading="Pokaż:"
      data={data}
    />
  );
};
