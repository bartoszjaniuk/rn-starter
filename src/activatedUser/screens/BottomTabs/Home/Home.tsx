import * as React from 'react';

import { HomeNavigator } from 'src/activatedUser/navigation';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, PressableScale, Text } from 'src/shared';

import * as route from '../../../navigation/routes';

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

const TrainerHeader = () => {
  return (
    <Screen.Header variant="primary">
      <Screen.Header.Left>
        <Text color="white" fontWeight="700" size="xs">
          Dodaj pierwszy wolny termin na trening
        </Text>
      </Screen.Header.Left>
      <Screen.Header.Right>
        <PressableScale onPress={() => null}>
          <Icon name="calendarLinear" color="transparent" />
        </PressableScale>
      </Screen.Header.Right>
    </Screen.Header>
  );
};

export const BottomTabsHome = () => {
  const userInfoQuery = useGetUserInfoQuery();

  const data = React.useMemo(
    () => ({
      trainingId: '1',
    }),
    [],
  );

  return (
    <Screen
      HeaderComponent={userInfoQuery.data?.role === 'trainee' ? <TraineeHeader /> : <TrainerHeader />}
      statusBarStyle="light"
    >
      <Screen.Navigator as={HomeNavigator} data={data} />
    </Screen>
  );
};
