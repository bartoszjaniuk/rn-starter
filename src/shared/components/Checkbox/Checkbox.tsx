import * as React from 'react';
import { useStyles } from 'react-native-unistyles';

import Checkbox, { CheckboxProps } from 'expo-checkbox';

import { Inline } from '@grapp/stacks';

type Props = {} & CheckboxProps;

export const Checkboxs = (props: React.PropsWithChildren<Props>) => {
  const { children, ...rest } = props;
  const { theme } = useStyles();
  return (
    <Inline space={4} alignY="center">
      <Checkbox color={theme.colors.primary} {...rest} />
      {children}
    </Inline>
  );
};
