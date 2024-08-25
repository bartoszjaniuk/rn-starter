import * as React from 'react';
import { TextInputProps, TextInput as TextInputRN } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Stack } from '@grapp/stacks';

import { Text } from '../Text/Text';

type Props = {
  label: string;
  isDisabled?: boolean;
  isError?: boolean;
  isRequired?: boolean;
  errorMessage?: React.ReactNode;
} & TextInputProps;

const getInputState = ({ isDisabled, isError }: { isError?: boolean; isDisabled?: boolean }) => {
  if (isError) return 'error';
  if (isDisabled) return 'disabled';
  return 'enabled';
};

export const TextInput = (props: Props) => {
  const { label, isError, isDisabled, errorMessage, ...rest } = props;
  const state = getInputState({ isDisabled, isError });
  const { styles, theme } = useStyles(stylesheet, { state });

  return (
    <Stack space={1}>
      <Text fontWeight="500" size="xs">
        {label}
      </Text>
      <TextInputRN
        readOnly={isDisabled}
        style={styles.input}
        placeholderTextColor={isDisabled ? theme.colors.disabled : theme.colors.gray}
        {...rest}
      />
      {isError ? (
        <Text fontWeight="400" size="xs" color="error">
          Pole nie moze być puste!
        </Text>
      ) : null}
    </Stack>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  input: {
    paddingLeft: 14,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: theme.fontFamily.satoshiRegular,
    color: theme.colors.gray,
    borderRadius: 5,
    borderWidth: 1,
    variants: {
      state: {
        enabled: {
          borderColor: theme.colors.gray,
        },
        error: {
          borderColor: theme.colors.error,
        },
        disabled: {
          borderColor: theme.colors.disabled,
          color: theme.colors.gray,
        },
      },
    },
  },
}));
