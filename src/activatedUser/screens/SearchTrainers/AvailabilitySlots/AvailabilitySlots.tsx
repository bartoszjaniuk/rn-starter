import React from 'react';

import { useTrainerAvailabilitiesQuery } from 'src/api/trainer';
import { Screen } from 'src/screen';
import { Text } from 'src/shared';

const Content = () => {
  const trainerAvailabilitiesQuery = useTrainerAvailabilitiesQuery({
    trainerId: 'c1b8bbc5-5cc3-476c-962b-3b09505eb639',
    date: {
      from: '2024-11-18',
      to: '2024-11-19',
    },
  });
  return (
    <Screen.Content>
      <Text fontWeight="400" size="sm" color="veryGray">
        Zielona kropka oznacza wolny termin, wybierz go i zarezerwuj trening!
      </Text>
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
