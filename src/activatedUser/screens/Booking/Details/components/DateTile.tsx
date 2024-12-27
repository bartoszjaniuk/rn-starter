import * as React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box, Inline, Stack } from '@grapp/stacks';

import { Text } from 'src/shared';

type Props = {
  dateStart: string;
  dateEnd: string;
  name: string;
  description: string;
};

export const DateTile = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const { dateEnd, dateStart, description, name } = props;

  return (
    <Inline space={2} style={styles.container}>
      <Stack space={8}>
        <Text fontWeight="300" size="xs">
          {dateStart}
        </Text>
        <Text fontWeight="300" size="xs">
          {dateEnd}
        </Text>
      </Stack>
      <Stack space={1} flex="fluid">
        <Box height={0.5} backgroundColor="#C7C7CC" />
        <Stack flex="fluid" style={styles.trainingSlot}>
          <Text color="typography">{name}</Text>
          <Text fontWeight="700" color="typography">
            {description}
          </Text>
        </Stack>
        <Box height={0.5} backgroundColor="#C7C7CC" />
      </Stack>
    </Inline>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#323232',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  trainingSlot: {
    backgroundColor: '#F0FFF1',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderLeftColor: theme.colors.primary,
    borderLeftWidth: 3,
    flex: 1,
  },
}));
