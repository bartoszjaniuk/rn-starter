import * as React from 'react';

import { CalendarTrainerNavigator } from 'src/activatedUser/navigation';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, PressableScale } from 'src/shared';

import * as route from '../../../navigation/routes';
import { getFirstAndLastDaysOfMonth } from '../../SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getFirstAndLastDaysOfMonth';
import { getPastPresentFutureDates } from '../../SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';

export type AvailabilityParams = {
  trainerId: string;
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
};

export const BottomTabsCalendar = () => {
  const { lastDay, today } = getFirstAndLastDaysOfMonth();
  // const { trainerId } = useRouteParams(route.toCalendarTrainerMonthly);
  const userInfoQuery = useGetUserInfoQuery();
  const navigateToAddAvailability = () => goTo(route.toCalendarTrainerAddAvailability);

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
    }),
    [future, lastDay, past, today, userInfoQuery.data?.trainerId],
  );

  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="primary">
          <Screen.Header.Right>
            <PressableScale onPress={navigateToAddAvailability}>
              <Icon name="plusThin" color="primary" />
            </PressableScale>
          </Screen.Header.Right>
        </Screen.Header>
      }
      statusBarStyle="light"
    >
      <Screen.Navigator as={CalendarTrainerNavigator} data={data} />
    </Screen>
  );
};
