import React from 'react';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box, Inline } from '@grapp/stacks';

import { Icon, Text } from 'src/shared';

export const CustomToast = (toastProps: ToastProps) => {
  const { data, message, type } = toastProps;
  const { styles } = useStyles(stylesheet);

  return (
    <Box style={styles.container}>
      {data?.title ? <Text style={styles.title}>{data.title}</Text> : null}
      <Inline alignY="center" space={2}>
        <Icon
          name={type === 'success' ? 'checkmark' : 'closeX'}
          svgProps={{ width: 24, height: 24 }}
          color={type === 'success' ? 'primary' : 'error'}
        />
        <Text fontWeight="500" size="sm" color="white">
          {message}
        </Text>
      </Inline>
    </Box>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    maxWidth: '85%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: theme.colors.snacks,
    marginVertical: 4,
    borderRadius: 8,
    // borderLeftColor: theme.colors.primary,
    // borderLeftWidth: 6,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  title: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
}));
