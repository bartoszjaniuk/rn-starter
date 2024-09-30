import * as React from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps, TextInput as TextInputRN } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Inline, Stack } from '@grapp/stacks';

import { Text } from '../Text/Text';

type Props = {
  label: string;
  isDisabled?: boolean;
  isError?: boolean;
  isRequired?: boolean;
  errorMessage?: React.ReactNode;
} & TextInputProps;

const getInputState = ({
  isDisabled,
  isError,
  isFocused,
}: {
  isError?: boolean;
  isDisabled?: boolean;
  isFocused?: boolean;
}) => {
  if (isError) return 'error';
  if (isDisabled) return 'disabled';
  if (isFocused) return 'focused';
  return 'enabled';
};

export const TextInput = (props: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const { label, isError, isDisabled, errorMessage, isRequired, onFocus, multiline = false, ...rest } = props;
  const state = getInputState({ isDisabled, isError, isFocused });
  const { styles, theme } = useStyles(stylesheet, { state, multiline });

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus?.(e);
    setIsFocused(false);
  };

  return (
    <Stack space={2}>
      <Inline>
        <Text fontWeight="500" size="xs">
          {label}
        </Text>
        {isRequired ? (
          <Text fontWeight="500" size="xs" color="asteriskError">
            *
          </Text>
        ) : null}
      </Inline>
      <TextInputRN
        {...rest}
        multiline={multiline}
        autoCapitalize="none"
        cursorColor={theme.colors.primary}
        selectionColor={theme.colors.primary}
        onBlur={handleBlur}
        onFocus={handleFocus}
        readOnly={isDisabled}
        style={styles.input}
        placeholderTextColor={isDisabled ? theme.colors.disabled : theme.colors.gray}
      />
      {isError ? (
        <Text fontWeight="400" size="xs" color="error">
          {errorMessage}
        </Text>
      ) : null}
    </Stack>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  input: {
    paddingLeft: 14,
    paddingTop: 12,
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
        focused: {
          borderColor: theme.colors.primary,
        },
      },
      multiline: {
        true: {
          paddingBottom: 72,
        },
        false: {
          paddingBottom: 12,
        },
      },
    },
  },
}));
