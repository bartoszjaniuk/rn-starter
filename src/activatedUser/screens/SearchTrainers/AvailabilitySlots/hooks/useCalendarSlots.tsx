import * as React from 'react';
import { useStyles } from 'react-native-unistyles';

import { TrainerAvailabilitiesGetV1Response } from 'src/api/trainer';

type MarkedDates = {
  [date: string]: {
    marked: boolean;
    selectedDotColor: string;
  };
};

export type CalendarSlots = {
  markedDates: MarkedDates;
  availableSlots: string[];
};

export const useCalendarSlots = (data: TrainerAvailabilitiesGetV1Response | undefined) => {
  const { theme } = useStyles();

  const availableSlots = Object.keys(data?.data ?? []);
  const markedDates = React.useMemo(() => {
    if (!data?.data) return {};

    const markedDates: MarkedDates = {};
    availableSlots.forEach((date) => {
      const schedule = data.data[date];
      if (schedule && schedule.length > 0) {
        markedDates[date] = {
          marked: true,
          selectedDotColor: theme.colors.primary,
        };
      }
    });
    return markedDates;
  }, [availableSlots, data?.data, theme.colors.primary]);

  return { markedDates, availableSlots };
};
