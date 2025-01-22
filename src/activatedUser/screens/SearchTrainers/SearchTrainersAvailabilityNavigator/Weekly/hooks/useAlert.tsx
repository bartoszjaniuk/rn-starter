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
    () =>
      (reservationTitle = title, onReserve?: VoidFunction) => {
        Alert.alert(
          `Czy na pewno chcesz usunąć dostępność? (${reservationTitle})`,
          message,
          [
            { text: 'Anuluj', style: 'cancel' },
            { text: 'Usuń', style: 'destructive', onPress: onReserve },
          ],
          options,
        );
      },
    [message, options, title],
  );
  return openAlert;
};
