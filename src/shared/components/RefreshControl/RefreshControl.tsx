import React from 'react';
import { RefreshControlProps } from 'react-native';
import { RefreshControl as RefreshControlRN } from 'react-native-gesture-handler';
import { useStyles } from 'react-native-unistyles';

type Props = Omit<RefreshControlProps, 'progressBackgroundColor' | 'tintColor' | 'colors'>;

export const RefreshControl = React.forwardRef<RefreshControlRN, Props>((props, ref) => {
  const { refreshing, onRefresh } = props;
  const { theme } = useStyles();
  return (
    <RefreshControlRN
      ref={ref}
      refreshing={refreshing}
      onRefresh={onRefresh}
      progressBackgroundColor={theme.colors.white}
      tintColor={theme.colors.white}
    />
  );
});
