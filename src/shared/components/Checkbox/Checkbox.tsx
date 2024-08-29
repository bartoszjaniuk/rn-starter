import * as React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Inline, Stack } from '@grapp/stacks';
import CheckBoxCommunity, { CheckBoxProps } from '@react-native-community/checkbox';

import { Text } from '../Text';

type Props = {
  isError?: boolean;
  isRequired?: boolean;
  errorMessage?: React.ReactNode;
} & CheckBoxProps;

export const Checkbox = (props: React.PropsWithChildren<Props>) => {
  const { children, isError, errorMessage, ...rest } = props;
  const { theme, styles } = useStyles(stylesheet);
  return (
    <Stack space={2}>
      <Inline space={4} alignY="center">
        <CheckBoxCommunity
          {...rest}
          lineWidth={3}
          boxType="square"
          tintColor={theme.colors.gray}
          tintColors={{ false: theme.colors.gray, true: theme.colors.typography }}
          disabled={false}
          onCheckColor={theme.colors.typography}
          onTintColor={theme.colors.primary}
          onFillColor={theme.colors.primary}
          offAnimationType="fade"
          onAnimationType="fade"
          style={styles.checkbox}
        />
        {children}
      </Inline>
      {isError ? (
        <Text fontWeight="400" size="xs" color="error">
          {errorMessage}
        </Text>
      ) : null}
    </Stack>
  );
};

const stylesheet = createStyleSheet((_theme) => ({
  checkbox: {
    width: 23,
    height: 23,
  },
}));
