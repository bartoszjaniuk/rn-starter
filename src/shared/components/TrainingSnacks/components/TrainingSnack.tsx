import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Inline } from '@grapp/stacks';

import { Text } from 'src/shared';

type Props = {
  title: string;
};

export const TrainingSnack = ({ title }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.tile}>
      <Text size="xs" align="center" fontWeight="500" color="white" numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  tile: {
    borderRadius: 4,
    backgroundColor: theme.colors.typography,
    height: 24,
    // minWidth: 115,
    // maxWidth: 115,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
