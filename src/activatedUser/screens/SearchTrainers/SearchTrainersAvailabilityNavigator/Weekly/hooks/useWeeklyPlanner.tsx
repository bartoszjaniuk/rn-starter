import * as React from 'react';
import { TimelineEventProps, TimelineListProps } from 'react-native-calendars';

import { TrainerAvailabilitiesGetV1Response } from 'src/api/trainer';

export const useWeeklyPlanner = (
  data: TrainerAvailabilitiesGetV1Response | undefined,
): TimelineListProps['events'] & {
  range: string;
} => {
  const events = React.useMemo(() => {
    if (!data?.data) return {};
    const today = new Date().toISOString().slice(0, 10);

    return Object.entries(data.data).reduce(
      (acc, [date, entries]) => {
        if (date < today) return acc;
        acc[date] = entries.map((entry) => ({
          id: entry.id,
          start: `${date} ${entry.start.padEnd(8, ':00')}`,
          end: `${date} ${entry.end.padEnd(8, ':00')}`,
          title: 'Wolny termin - zarezerwuj',
          summary: 'Opis',
          color: '#F0FFF1',
          range: `${entry.start}-${entry.end}`,
        }));
        return acc;
      },
      {} as { [date: string]: TimelineEventProps[] },
    );
  }, [data?.data]);

  return events;
};
