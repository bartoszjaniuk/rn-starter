import * as React from 'react';
import { useStyles } from 'react-native-unistyles';

import { Box, Stack } from '@grapp/stacks';

import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, PressableScale, Text } from 'src/shared';

import * as route from '../../../../../navigation/routes';
import { NoSchedules } from '../../components/NoSchedules';

const TraineeContent = () => {
  //  TODO: There should be api call to check if trainee has any trainings
  const { theme } = useStyles();

  const handleNavigateToSearchTrainers = () => goTo(route.toSearchTrainersList);
  return (
    <Screen.Content alignY="bottom">
      <Stack space={2} align="right" paddingBottom={2}>
        <PressableScale style={{ width: 48, height: 48 }} onPress={handleNavigateToSearchTrainers}>
          <Box
            width={48}
            height={48}
            alignX="center"
            alignY="center"
            borderRadius={24}
            backgroundColor={theme.colors.primary}
          >
            <Icon name="plus" svgProps={{ width: 24, height: 24 }} color="typography" />
          </Box>
        </PressableScale>
        <Stack>
          <Text align="center" fontWeight="500" size="xs">
            Szukaj
          </Text>
          <Text align="center" fontWeight="500" size="xs">
            treningu
          </Text>
        </Stack>
      </Stack>
    </Screen.Content>
  );
};
const TrainerContent = () => {
  // There should be api call to check if trainer has any trainings
  return <NoSchedules />;
};

const Content = () => {
  const userInfoQuery = useGetUserInfoQuery();

  if (userInfoQuery.isLoading) return <LoadingScreen />;

  return userInfoQuery.data?.role === 'trainee' ? <TraineeContent /> : <TrainerContent />;
};

export const HomeTrainingList = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
