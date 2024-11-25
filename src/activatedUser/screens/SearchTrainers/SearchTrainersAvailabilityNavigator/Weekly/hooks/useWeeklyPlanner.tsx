import * as React from 'react';
import { TimelineEventProps, TimelineListProps } from 'react-native-calendars';
import { useStyles } from 'react-native-unistyles';

import { TrainerAvailabilitiesGetV1Response } from 'src/api/trainer';

export const useWeeklyPlanner = (data: TrainerAvailabilitiesGetV1Response | undefined): TimelineListProps['events'] => {
  const { theme } = useStyles();

  const events = React.useMemo(() => {
    if (!data?.data) return {};

    return Object.entries(data.data).reduce(
      (acc, [date, entries]) => {
        acc[date] = entries.map((entry) => ({
          start: `${date} ${entry.start.padEnd(8, ':00')}`,
          end: `${date} ${entry.end.padEnd(8, ':00')}`,
          title: 'Wolny termin - zarezerwuj',
          summary: 'Opis',
          color: theme.colors.veryGray,
        }));
        return acc;
      },
      {} as { [date: string]: TimelineEventProps[] },
    );
  }, [data?.data, theme.colors.veryGray]);

  return events;
};
