import * as React from 'react';

import { Box, ResponsiveProp, Stack } from '@grapp/stacks';

import { Screen, useScreen } from 'src/screen';
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

type Props = React.PropsWithChildren<PropsWithHeader | PropsWithHeaderVariant> & {
  innerSpace?: ResponsiveProp<number>;
};

export const StepLayout = ({
  variant,
  header,
  buttonLabel,
  children,
  shouldShowError,
  handleButtonClick,
  innerSpace = 6,
}: Props) => {
  const { paddingX: defaultPaddingX } = useScreen();

  return (
    <>
      {variant === 'Profile' ? (
        <Screen.ScrollView paddingY={1} flex="fluid">
          <Stack space={6}>
            {variant ? <StepHeader variant={variant} /> : header}
            <Stack space={4}>
              {shouldShowError ? <Text>Error</Text> : null}
              {children}
            </Stack>
          </Stack>
        </Screen.ScrollView>
      ) : (
        <Box paddingX={defaultPaddingX} paddingY={1} flex="fluid">
          <Stack space={innerSpace} flex="fluid">
            {variant ? <StepHeader variant={variant} /> : header}
            <Stack space={4} flex="fluid">
              {shouldShowError ? <Text>Error</Text> : null}
              {children}
            </Stack>
          </Stack>
        </Box>
      )}
      <Screen.Footer>
        <Button onPress={handleButtonClick}>{buttonLabel}</Button>
      </Screen.Footer>
    </>
  );
};
