import * as React from 'react';
import { WeekCalendarProps } from 'react-native-calendars';

import { TrainerAvailabilitiesGetV1Response } from 'src/api/trainer';

export const useMarkedDates = (data: TrainerAvailabilitiesGetV1Response | undefined) => {
  const availableSlots = Object.keys(data?.data ?? []);
  const markedDates = React.useMemo(() => {
    if (!data?.data) return {};

    const markedDates: WeekCalendarProps['markedDates'] = {};
    const today = new Date().toISOString().slice(0, 10);
    availableSlots.forEach((date) => {
      const schedule = data.data[date];
      if (schedule && schedule.length > 0 && date >= today) {
        markedDates[date] = {
          marked: true,
        };
      }
    });
    return markedDates;
  }, [availableSlots, data?.data]);

  return markedDates;
};
