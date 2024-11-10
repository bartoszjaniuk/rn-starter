import React from 'react';
import { useStyles } from 'react-native-unistyles';

import { Box, Inline } from '@grapp/stacks';

import { Icon, PressableScale, Text } from 'src/shared';
import { IconName } from 'src/shared/components/Icon/icons';

export type SettingsOption = {
  icon: IconName;
  title: string;
  color: 'primary' | 'error';
  onPress?: VoidFunction;
};

export const SettingsOption = ({ color, icon, title, onPress }: SettingsOption) => {
  const { theme } = useStyles();
  return (
    <PressableScale onPress={onPress}>
      <Inline space={4} alignY="center">
        <Box
          width={48}
          height={48}
          alignX="center"
          alignY="center"
          borderRadius={5}
          backgroundColor={theme.colors.snacks}
        >
          <Icon svgProps={{ width: 24, height: 24 }} name={icon} color={color} />
        </Box>
        <Text fontWeight="500" size="sm" color="white">
          {title}
        </Text>
      </Inline>
    </PressableScale>
  );
};
