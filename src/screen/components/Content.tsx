import * as React from 'react';

import { Box, Row, type RowProps } from '@grapp/stacks';

import { useScreen } from '../providers';

export const Content = Row.from((props: RowProps) => {
  const { paddingX, flex = 'fluid', ...rest } = props;
  const { paddingX: defaultPaddingX } = useScreen();

  return <Box paddingX={paddingX ?? defaultPaddingX} flex={flex} {...rest} />;
});
