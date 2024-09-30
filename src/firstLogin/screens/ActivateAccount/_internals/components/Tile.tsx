import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { PressableScale, Text } from 'src/shared';

type Props = {
  label: string;
  value: number;
  isSelected: boolean;
  onPress: (activityId: number) => void;
};

export const Tile = ({ label, isSelected, onPress, value }: Props) => {
  const { styles } = useStyles(stylesheet, { isSelected });

  const handlePress = () => onPress(value);

  return (
    <PressableScale style={styles.tile} onPress={handlePress}>
      <Text
        size="sm"
        fontWeight="500"
        color={isSelected ? 'typography' : 'white'}
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        {label}
      </Text>
    </PressableScale>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  tile: {
    borderRadius: 5,
    height: 48,
    minWidth: 103,
    maxWidth: 163,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      isSelected: {
        true: {
          backgroundColor: theme.colors.primary,
        },
        false: {
          backgroundColor: theme.colors.snacks,
        },
      },
    },
  },
}));
