import * as React from 'react';
import { ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';

import { Box, ResponsiveProp } from '@grapp/stacks';

type Props = {
  value: number;
  borderRadius?: ResponsiveProp<number>;
  style?: ViewProps['style'];
  height?: number;
};

export const ProgressBar = (props: Props) => {
  const { value, height = 1, borderRadius = 1, style } = props;
  const { theme } = useStyles();

  return (
    <Box height={height} borderRadius={borderRadius} backgroundColor={theme.colors.gray}>
      <Box
        as={Animated.View}
        height={height}
        width={`${value * 100}%`}
        borderRadius={borderRadius}
        backgroundColor={theme.colors.primary}
        style={style}
      />
    </Box>
  );
};
