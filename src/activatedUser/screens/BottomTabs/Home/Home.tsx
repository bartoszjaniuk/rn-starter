import * as React from 'react';

import { Box } from '@grapp/stacks';

import { HomeNavigator } from 'src/activatedUser/navigation';
import { useTrainerAvailabilitiesQuery } from 'src/api/trainer';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, PressableScale, Text } from 'src/shared';

import * as route from '../../../navigation/routes';
import { getPastPresentFutureDates } from '../../SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';

export type HomeParams = {
  trainingId: string;
};

const TraineeHeader = () => {
  return (
    <Screen.Header variant="primary">
      <Screen.Header.Left>
        <Text color="primary" fontWeight="700" size="xs">
          Zaktualizuj swoje wymiary
        </Text>
      </Screen.Header.Left>
      <Screen.Header.Right>
        <PressableScale onPress={() => goTo(route.toHomeUpdateParameters)}>
          <Icon name="plusThin" color="primary" />
        </PressableScale>
      </Screen.Header.Right>
    </Screen.Header>
  );
};

const TrainerHeader = ({ trainerId }: { trainerId: string | undefined }) => {
  const { today, lastDay } = getPastPresentFutureDates();

  const trainerAvailabilitiesQuery = useTrainerAvailabilitiesQuery({
    trainerId: trainerId ?? '',
    date: { from: today, to: lastDay },
  });

  const handleNavigateToCalendar = () => {
    goTo(route.toBottomTabsCalendar);
    // FIXME: This is a workaround to navigate to the AddAvailability nested screen
    setTimeout(() => {
      goTo(route.toCalendarTrainerAddAvailability);
    }, 1);
  };
  if (trainerAvailabilitiesQuery.data?.meta.totalItems !== 0)
    return (
      <Screen.Header variant="primary">
        <Screen.Header.Left>
          <Text color="white" fontWeight="700" size="xs">
            Dodaj pierwszy wolny termin na trening
          </Text>
        </Screen.Header.Left>
        <Screen.Header.Right>
          <PressableScale onPress={handleNavigateToCalendar}>
            <Icon name="calendarLinear" color="transparent" />
          </PressableScale>
        </Screen.Header.Right>
      </Screen.Header>
    );
  return <Box padding={5}></Box>;
};

export const BottomTabsHome = () => {
  const userInfoQuery = useGetUserInfoQuery();

  const data = React.useMemo(
    () => ({
      trainingId: '1',
    }),
    [],
  );
  if (userInfoQuery.isLoading) return <LoadingScreen />;

  return (
    <Screen
      HeaderComponent={
        userInfoQuery.data?.role === 'trainee' ? (
          <TraineeHeader />
        ) : (
          <TrainerHeader trainerId={userInfoQuery.data?.trainerId} />
        )
      }
      statusBarStyle="light"
    >
      <Screen.Navigator as={HomeNavigator} data={data} />
    </Screen>
  );
};
