import * as React from 'react';

import { useMarkedDates } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Weekly/hooks/useMarkedDates';
import { useWeeklyPlanner } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Weekly/hooks/useWeeklyPlanner';
import { getPastPresentFutureDates } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';
import { useTrainerAvailabilitiesQuery } from 'src/api/trainer';
import { goTo } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { Icon } from 'src/shared';
import { PressableScale } from 'src/shared';
import { TimelineWeeklyV2 } from 'src/shared/components/TimelineWeeklyV2';

import * as route from '../../../../../navigation/routes';
import { AvailabilityParams } from '../../Calendar';

const Content = () => {
  const { navigationData, updateNavigationData } = useNavigator<AvailabilityParams>();

  const trainerAvailabilitiesQuery = useTrainerAvailabilitiesQuery({
    trainerId: navigationData.trainerId,
    date: {
      from: navigationData.weekly.from,
      to: navigationData.weekly.to,
    },
  });

  const weeklyPlanner = useWeeklyPlanner(trainerAvailabilitiesQuery.data);
  const markedDates = useMarkedDates(trainerAvailabilitiesQuery.data);

  const onDateChanged = (date: string) => {
    const { past, future } = getPastPresentFutureDates(31, date);
    updateNavigationData({ weekly: { from: past, to: future }, weekDate: new Date(date).toISOString().slice(0, 10) });
  };

  return (
    <TimelineWeeklyV2
      isLoading={trainerAvailabilitiesQuery.isFetching}
      date={navigationData.weekDate}
      markedDates={markedDates}
      onDateChanged={onDateChanged}
      weeklyPlanner={weeklyPlanner}
      trainerId={navigationData.trainerId}
    />
  );
};

export const CalendarTrainerWeekly = () => {
  const navigateToAddAvailability = () => {
    goTo(route.toCalendarTrainerAddAvailability);
  };

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
    >
      <Content />
    </Screen>
  );
};
