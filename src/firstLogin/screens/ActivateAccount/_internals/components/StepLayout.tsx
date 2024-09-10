import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { Button, Text } from 'src/shared';

import { StepHeader } from './StepHeader';

export type HeaderVariant = 'Profile' | 'Target' | 'Photos';

type PropsWithHeader = {
  buttonLabel: string;
  shouldShowError: boolean;
  handleButtonClick: VoidFunction;
  header?: React.ReactNode;
  variant?: never;
};

type PropsWithHeaderVariant = {
  buttonLabel: string;
  shouldShowError: boolean;
  handleButtonClick: VoidFunction;
  header?: never;
  variant?: HeaderVariant;
};

type Props = React.PropsWithChildren<PropsWithHeader | PropsWithHeaderVariant>;

export const StepLayout = ({ variant, header, buttonLabel, children, shouldShowError, handleButtonClick }: Props) => {
  return (
    <>
      <Screen.ScrollView paddingY={8} flex="fluid">
        <Stack space={6}>
          {variant ? <StepHeader variant={variant} /> : header}
          <Stack space={4}>
            {shouldShowError ? <Text>Error</Text> : null}
            {children}
          </Stack>
        </Stack>
      </Screen.ScrollView>
      <Screen.Footer>
        <Button onPress={handleButtonClick}>{buttonLabel}</Button>
      </Screen.Footer>
    </>
  );
};
