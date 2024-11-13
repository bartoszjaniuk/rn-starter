import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { Checkbox, Text } from 'src/shared';

type CheckBoxListOption = {
  key: string;
  value: string;
  title: string;
};

export type CheckBoxListOptions = CheckBoxListOption[];

type Props = {
  heading: string;
  data: CheckBoxListOptions;
};

export const CheckboxList = (props: Props) => {
  const { data, heading } = props;
  const initialState = data.map((option) => ({
    [option.key]: '',
  }));
  const [checkbox, setCheckbox] = React.useState(initialState);

  const handleChangeValue = (key: string, value: string) => {
    setCheckbox({
      ...initialState,
      [key]: value,
    });
  };

  return (
    <Stack space={4}>
      <Text fontWeight="700" size="sm">
        {heading}
      </Text>
      {data.map((option) => (
        <Checkbox
          key={option.key}
          value={!!checkbox[option.key]}
          onValueChange={() => handleChangeValue(option.key, option.value)}
        >
          <Text>{option.title}</Text>
        </Checkbox>
      ))}
    </Stack>
  );
};
