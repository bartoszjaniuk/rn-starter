import * as React from 'react';
import { useStyles } from 'react-native-unistyles';

import { Inline } from '@grapp/stacks';

type Props = {} & CheckBoxProps;

export const Checkboxs = (props: React.PropsWithChildren<Props>) => {
  const { children, ...rest } = props;
  const { theme } = useStyles();
  return (
    <Inline space={4} alignY="center">
      <CheckBox checkBoxColor={theme.colors.gray} checkedCheckBoxColor={theme.colors.primary} {...rest} />
      {children}
    </Inline>
  );
};
