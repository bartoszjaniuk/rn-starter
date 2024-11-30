import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { useTrainerAvailabilitiesQuery } from 'src/api/trainer';
import { goTo } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { CalendarMonthly, Text } from 'src/shared';

import { useCalendarSlots } from './hooks/useCalendarSlots';

import * as route from '../../../../navigation/routes';
import { AvailabilityParams } from '../../Availability';
import { getFirstAndLastDaysOfMonth } from '../_internals/utils/getFirstAndLastDaysOfMonth';
import { getPastPresentFutureDates } from '../_internals/utils/getPastPresentFutureDates';

const Content = () => {
  const { navigationData, updateNavigationData } = useNavigator<AvailabilityParams>();

  const onMonthChange = (dateString: string) => {
    const { firstDay, lastDay } = getFirstAndLastDaysOfMonth(dateString);
    updateNavigationData({ monthly: { from: firstDay, to: lastDay } });
  };

  const onDayPress = (date: { dateString: string }) => {
    if (calendarSlots.availableSlots.includes(date.dateString)) {
      const { future, past } = getPastPresentFutureDates(7, date.dateString);
      updateNavigationData({ weekDate: date.dateString, weekly: { from: past, to: future } });
      goTo(route.toSearchTrainersAvailabilityWeekly, { weekDate: date.dateString });
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
          Zielona kropka oznacza wolny termin, wybierz go i zarezerwuj trening!
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

export const SearchTrainersAvailabilityMonthly = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
