import * as React from 'react';

import { Box } from '@grapp/stacks';

import { CalendarTrainerNavigator } from 'src/activatedUser/navigation';
import { useAuth } from 'src/providers/AuthContext';
import { Screen } from 'src/screen';

import { getFirstAndLastDaysOfMonth } from '../../SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getFirstAndLastDaysOfMonth';
import { getPastPresentFutureDates } from '../../SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';

export type AvailabilityParams = {
  trainerId: string;
  month: number;
  monthly: {
    from: string;
    to: string;
  };
  weekly: {
    from: string;
    to: string;
  };
  weekDate: string;
  selectedDay: string;
  role: string;
};

export const BottomTabsCalendar = () => {
  const { lastDay, today } = getFirstAndLastDaysOfMonth();
  const auth = useAuth();

  const { past, future } = getPastPresentFutureDates(7);

  const data = React.useMemo(
    () => ({
      trainerId: auth.user?.trainerId,
      monthly: {
        from: today,
        to: lastDay,
      },
      weekly: {
        from: past,
        to: future,
      },
      weekDate: new Date().toISOString().slice(0, 10),
      selectedDay: today,
      month: new Date(today ?? '').getMonth(),
      role: auth.user?.role,
    }),
    [future, lastDay, past, today, auth.user?.role, auth.user?.trainerId],
  );

  return (
    <Box flex="fluid" backgroundColor="#181A1E">
      <Screen.Navigator as={CalendarTrainerNavigator} data={data} />
    </Box>
  );
};
