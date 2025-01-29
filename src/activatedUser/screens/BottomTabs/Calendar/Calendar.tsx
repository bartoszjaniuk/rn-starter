import * as React from 'react';

import { Box } from '@grapp/stacks';

import { CalendarTrainerNavigator } from 'src/activatedUser/navigation';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
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
  const userInfoQuery = useGetUserInfoQuery();

  const { past, future } = getPastPresentFutureDates(7);

  const data = React.useMemo(
    () => ({
      trainerId: userInfoQuery.data?.trainerId,
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
      role: userInfoQuery.data?.role,
    }),
    [future, lastDay, past, today, userInfoQuery.data?.role, userInfoQuery.data?.trainerId],
  );

  return (
    <Box flex="fluid" backgroundColor="#181A1E">
      <Screen.Navigator as={CalendarTrainerNavigator} data={data} />
    </Box>
  );
};
