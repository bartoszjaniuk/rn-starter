import * as React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box } from '@grapp/stacks';

export const Badge = ({ children }: React.PropsWithChildren) => {
  const { styles } = useStyles(stylesheet);
  return <Box style={styles.icon}>{children}</Box>;
};

const stylesheet = createStyleSheet((theme) => ({
  icon: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 12,
    backgroundColor: '#292930',
  },
}));
