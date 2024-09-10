import * as React from 'react';

import { LinearGradient } from 'expo-linear-gradient';

import { Box, FloatBox } from '@grapp/stacks';

import { useScreen } from '../providers';

export const NavigatorItem = (props: React.PropsWithChildren) => {
  const { children } = props;
  const { backgroundColor: screenBackgroundColor } = useScreen();

  return (
    <Box flex="fluid" backgroundColor="gray">
      <FloatBox height="100%" top={0} left={0} right={0} bottom={0} backgroundColor="#181A1E">
        <LinearGradient colors={['#181A1E', '#181A1E']} start={[0, 0]} end={[0, 1]} style={{ flex: 1 }} />
        <LinearGradient colors={['#2E2E35', '#191A1E']} start={[0, 1]} end={[0, 0]} style={{ flex: 1 }} />
      </FloatBox>
      {children}
    </Box>
  );
};
