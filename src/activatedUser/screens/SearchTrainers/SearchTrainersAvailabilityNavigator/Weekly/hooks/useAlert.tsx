import * as React from 'react';
import { Alert, AlertOptions } from 'react-native';

type AlertProps = {
  title: string;
  message?: string;
  options?: AlertOptions;
};

export const useAlert = (props: AlertProps) => {
  const { title, message, options } = props;
  const openAlert = React.useMemo(
    () => (onReserve?: VoidFunction) => {
      Alert.alert(
        title,
        message,
        [
          { text: 'Anuluj', style: 'cancel' },
          { text: 'Zarezerwuj', style: 'default', onPress: onReserve },
        ],
        options,
      );
    },
    [message, options, title],
  );
  return openAlert;
};
