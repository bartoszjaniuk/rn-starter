import * as React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { PressableScale } from 'src/shared';

type Props = {
  onPress?: VoidFunction;
};

export const IconWrapper = ({ children, onPress }: React.PropsWithChildren<Props>) => {
  const { styles } = useStyles(stylesheet);
  return (
    <PressableScale onPress={onPress} style={styles.icon}>
      {children}
    </PressableScale>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  icon: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    padding: 12,
    backgroundColor: '#292930',
  },
}));
