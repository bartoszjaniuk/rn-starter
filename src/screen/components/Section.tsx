import * as React from 'react';

import { Bleed, Box, type BoxProps } from '@grapp/stacks';

import { useScreen } from '../providers';

export const Section = (props: BoxProps) => {
  const {
    backgroundColor = '#FFF',
    paddingX,
    paddingY = 6,
    children,
    borderTopWidth = 1,
    borderBottomWidth = 1,
    // borderColor = '#EEEFF2',
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
        // borderColor={borderColor}
        {...rest}
      >
        {children}
      </Box>
    </Bleed>
  );
};
