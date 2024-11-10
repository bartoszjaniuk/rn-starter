import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Inline } from '@grapp/stacks';

import { Text } from 'src/shared';

type Props = {
  value: {
    title: string;
    value: string;
  };
};

export const Snack = ({ value }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Inline space={2} style={styles.tile}>
      <Text size="xs" fontWeight="400" color="gray" numberOfLines={1} ellipsizeMode="clip">
        {value.title}
      </Text>
      <Text size="xs" fontWeight="400" color="white" numberOfLines={1} ellipsizeMode="clip">
        {value.value}
      </Text>
    </Inline>
  );
};

const stylesheet = createStyleSheet((_theme) => ({
  tile: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#545458',
    height: 25,
    minWidth: 97,
    maxWidth: 104,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
