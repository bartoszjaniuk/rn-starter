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
  defaultValue?: string;
  onSelect?: (from: string) => void;
};

export const CheckboxList = (props: Props) => {
  const { data, heading, onSelect, defaultValue } = props;

  const [selectedKey, setSelectedKey] = React.useState<string | undefined>(defaultValue);

  const handleChangeValue = (key: string, value: string) => {
    setSelectedKey((prevKey) => (prevKey === key ? undefined : key));
    onSelect?.(value);
  };

  return (
    <Stack space={4}>
      <Text fontWeight="700" size="sm">
        {heading}
      </Text>
      {data.map((option) => (
        <Checkbox
          key={option.key}
          value={selectedKey === option.key}
          onValueChange={() => handleChangeValue(option.key, option.value)}
        >
          <Text>{option.title}</Text>
        </Checkbox>
      ))}
    </Stack>
  );
};
