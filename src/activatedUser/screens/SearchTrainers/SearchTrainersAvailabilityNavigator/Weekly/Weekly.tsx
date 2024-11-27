import * as React from 'react';

import { useTrainerAvailabilitiesQuery } from 'src/api/trainer';
import { Screen, useNavigator } from 'src/screen';
import { TimelineWeekly } from 'src/shared';

import { useWeeklyPlanner } from './hooks/useWeeklyPlanner';

import { AvailabilityParams } from '../../Availability';
import { getPastPresentFutureDates } from '../_internals/utils/getPastPresentFutureDates';

const Content = () => {
  const { navigationData, updateNavigationData } = useNavigator<AvailabilityParams>();

  const trainerAvailabilitiesQuery = useTrainerAvailabilitiesQuery({
    // trainerId: navigationData.trainerId,
    trainerId: 'c02b7f29-c21a-47c6-97aa-9036e495fc8d',
    date: {
      from: navigationData.weekly.from,
      to: navigationData.weekly.to,
    },
  });

  const weeklyPlanner = useWeeklyPlanner(trainerAvailabilitiesQuery.data);

  const onDateChanged = (date: string) => {
    const { past, future } = getPastPresentFutureDates(7, date);

    updateNavigationData({ weekly: { from: past, to: future } });
  };

  return (
    <TimelineWeekly
      date={navigationData.weekDate}
      onDateChanged={onDateChanged}
      weeklyPlanner={weeklyPlanner}
      trainerId={navigationData.trainerId}
    />
  );
};

export const SearchTrainersAvailabilityWeekly = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
