import * as React from 'react';

import { Bleed, Box, type BoxProps } from '@grapp/stacks';

import { useScreen } from '../providers';

export const Section = (props: BoxProps) => {
  const {
    backgroundColor = '#181A1E',
    paddingX,
    paddingY = 6,
    children,
    borderTopWidth = 1,
    borderBottomWidth = 1,
    ...rest
  } = props;
  const { paddingX: defaultPaddingX } = useScreen();
  const paddingHorizontal = paddingX ?? defaultPaddingX;

  return (
    <Bleed horizontal={paddingHorizontal}>
      <Box
        paddingX={paddingHorizontal}
        paddingY={paddingY}
        backgroundColor={backgroundColor}
        borderTopWidth={borderTopWidth}
        borderBottomWidth={borderBottomWidth}
        {...rest}
      >
        {children}
      </Box>
    </Bleed>
  );
};
