import * as React from 'react';

import { useMarkedDates } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Weekly/hooks/useMarkedDates';
import { useWeeklyPlanner } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Weekly/hooks/useWeeklyPlanner';
import { getPastPresentFutureDates } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';
import { useTrainerAvailabilitiesQuery } from 'src/api/trainer';
import { Screen, useNavigator } from 'src/screen';
import { TimelineWeekly } from 'src/shared';

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
    const { past, future } = getPastPresentFutureDates(7, date);
    updateNavigationData({ weekly: { from: past, to: future } });
  };

  return (
    <TimelineWeekly
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
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
