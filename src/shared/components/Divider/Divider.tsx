import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Inline } from '@grapp/stacks';

import { Text } from '../Text';

type Props = {
  text?: string;
};

export const Divider = (props: Props) => {
  const { text = 'lub' } = props;
  const { styles } = useStyles(styleSheet);

  return (
    <Inline flex="fluid" alignX="center" space={6} alignY="center">
      <View style={styles.line} />
      <Text size="sm" fontWeight="400">
        {text}
      </Text>
      <View style={styles.line} />
    </Inline>
  );
};

const styleSheet = createStyleSheet((theme) => ({
  line: {
    backgroundColor: theme.colors.gray,
    flex: 1,
    height: 1,
  },
}));
