import * as React from 'react';

import { useTrainerAvailabilitiesQuery } from 'src/api/trainer';
import { Screen, useNavigator } from 'src/screen';
import { TimelineWeeklyV2 } from 'src/shared/components/TimelineWeeklyV2/TimelineWeeklyV2';

import { useMarkedDates } from './hooks/useMarkedDates';
import { useWeeklyPlanner } from './hooks/useWeeklyPlanner';

import { AvailabilityParams } from '../../Availability';
import { getPastPresentFutureDates } from '../_internals/utils/getPastPresentFutureDates';

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

export const SearchTrainersAvailabilityWeekly = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="primary" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
