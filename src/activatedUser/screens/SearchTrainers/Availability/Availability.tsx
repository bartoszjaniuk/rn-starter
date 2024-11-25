import * as React from 'react';

import { SearchTrainersAvailabilityNavigator } from 'src/activatedUser/navigation';
import { useRouteParams } from 'src/core/hooks';
import { Screen } from 'src/screen';

import * as route from '../../../navigation/routes';
import { getFirstAndLastDaysOfMonth } from '../SearchTrainersAvailabilityNavigator/_internals/utils/getFirstAndLastDaysOfMonth';
import { getPastPresentFutureDates } from '../SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';

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
};

export const SearchTrainersAvailability = () => {
  const { firstDay, lastDay } = getFirstAndLastDaysOfMonth();
  const { trainerId } = useRouteParams(route.toSearchTrainersAvailability);

  const { past, future } = getPastPresentFutureDates(7);

  const data = React.useMemo(
    () => ({
      trainerId: trainerId,
      monthly: {
        from: firstDay,
        to: lastDay,
      },
      weekly: {
        from: past,
        to: future,
      },
      weekDate: new Date().toISOString().slice(0, 10),
    }),
    [firstDay, future, lastDay, past, trainerId],
  );

  return (
    <Screen HeaderComponent={<Screen.Header variant="primary" />} statusBarStyle="light">
      <Screen.Navigator as={SearchTrainersAvailabilityNavigator} data={data} />
    </Screen>
  );
};
