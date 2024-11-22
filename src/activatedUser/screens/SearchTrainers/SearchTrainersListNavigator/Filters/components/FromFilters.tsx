import * as React from 'react';

import { today } from 'src/shared';

import { CheckBoxListOptions, CheckboxList } from './CheckboxList';

const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const data: CheckBoxListOptions = [
  { key: 'fromToday', value: today, title: 'Dzisiaj' },
  { key: 'fromTomorrow', value: tomorrow, title: 'Jutro' },
  { key: 'fromNextWeek', value: tomorrow, title: 'W tym tygodniu' },
];

type Props = {
  defaultValue?: string;
  onSelectFrom: (from: string) => void;
};

export const FromFilters = (props: Props) => {
  const { defaultValue, onSelectFrom } = props;

  return (
    <CheckboxList
      defaultValue={data.find((d) => d.value === defaultValue)?.key}
      onSelect={onSelectFrom}
      heading="Pokaż dostępnych:"
      data={data}
    />
  );
};
