import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { useCalendarSlots } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Monthly/hooks/useCalendarSlots';
import { getFirstAndLastDaysOfMonth } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getFirstAndLastDaysOfMonth';
import { getPastPresentFutureDates } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';
import { useTrainerAvailabilitiesQuery } from 'src/api/trainer';
import { goTo } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { CalendarMonthly, Text } from 'src/shared';

import * as route from './../../../../../navigation/routes';

import { AvailabilityParams } from '../../Calendar';

const Content = () => {
  const { navigationData, updateNavigationData } = useNavigator<AvailabilityParams>();

  const onMonthChange = (dateString: string) => {
    const { firstDay, lastDay } = getFirstAndLastDaysOfMonth(dateString);
    updateNavigationData({
      monthly: { from: firstDay, to: lastDay },
      month: new Date(dateString).getMonth(),
      weekDate: firstDay,
    });
  };

  const onDayPress = (date: { dateString: string }) => {
    if (calendarSlots.availableSlots.includes(date.dateString)) {
      const { future, past } = getPastPresentFutureDates(7, date.dateString);
      updateNavigationData({ weekDate: date.dateString, weekly: { from: past, to: future } });
      goTo(route.toCalendarTrainerWeekly, { weekDate: date.dateString });
      return;
    }

    if (navigationData.role === 'trainer') {
      goTo(route.toCalendarTrainerAddAvailability);
      updateNavigationData({ weekDate: date.dateString });
      return;
    }
  };
  const trainerAvailabilitiesQuery = useTrainerAvailabilitiesQuery({
    trainerId: navigationData.trainerId,
    date: {
      from: navigationData.monthly.from,
      to: navigationData.monthly.to,
    },
  });

  const calendarSlots = useCalendarSlots(trainerAvailabilitiesQuery.data);

  return (
    <Screen.Content>
      <Stack space={4} paddingTop={4}>
        <Text fontWeight="400" size="sm" color="veryGray">
          Utworz slot który będzie widoczny dla podopiecznych. Gdy podopieczny zarezerwuje slot to otrzymasz informacje
          na dashboardzie!
        </Text>
        <CalendarMonthly
          calendarProps={{ displayLoadingIndicator: trainerAvailabilitiesQuery.isLoading }}
          calendarSlots={calendarSlots}
          onMonthChange={onMonthChange}
          onDayPress={onDayPress}
        />
      </Stack>
    </Screen.Content>
  );
};

export const CalendarTrainerMonthly = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
