import React from 'react';
import { RefreshControlProps, RefreshControl as RefreshControlRN } from 'react-native';
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
