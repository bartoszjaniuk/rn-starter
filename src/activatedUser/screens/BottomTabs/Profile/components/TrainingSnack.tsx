import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Inline } from '@grapp/stacks';

import { Text } from 'src/shared';

type Props = {
  title: string;
};

export const TrainingSnack = ({ title }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Inline space={2} style={styles.tile}>
      <Text size="xs" fontWeight="500" color="white" numberOfLines={1} ellipsizeMode="clip">
        {title}
      </Text>
    </Inline>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  tile: {
    borderRadius: 4,
    backgroundColor: theme.colors.typography,
    height: 24,
    minWidth: 97,
    maxWidth: 104,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
