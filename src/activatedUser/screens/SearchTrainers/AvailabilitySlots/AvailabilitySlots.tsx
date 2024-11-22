import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { useTrainerAvailabilitiesQuery } from 'src/api/trainer';
import { Screen } from 'src/screen';
import { CalendarMonthly, Text } from 'src/shared';

import { useCalendarSlots } from './hooks/useCalendarSlots';

const Content = () => {
  const trainerAvailabilitiesQuery = useTrainerAvailabilitiesQuery({
    trainerId: 'c02b7f29-c21a-47c6-97aa-9036e495fc8d',
    date: {
      from: '2024-11-22',
      to: '2024-11-30',
    },
  });

  const calendarSlots = useCalendarSlots(trainerAvailabilitiesQuery.data);

  return (
    <Screen.Content>
      <Stack space={4}>
        <Text fontWeight="400" size="sm" color="veryGray">
          Zielona kropka oznacza wolny termin, wybierz go i zarezerwuj trening!
        </Text>
        <CalendarMonthly calendarSlots={calendarSlots} />
      </Stack>
    </Screen.Content>
  );
};

export const SearchTrainersAvailabilitySlots = () => {
  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="transparent">
          {/* <Screen.Header.Left>
          <Screen.Header.GoBackButton>
            <Text>Wróć do profilu</Text>
          </Screen.Header.GoBackButton>
        </Screen.Header.Left> */}
          <Screen.Header.Title>Wróć do profilu</Screen.Header.Title>
        </Screen.Header>
      }
      statusBarStyle="light"
    >
      <Content />
    </Screen>
  );
};
