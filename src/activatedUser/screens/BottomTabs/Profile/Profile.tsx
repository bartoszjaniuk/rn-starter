import * as React from 'react';
import { FlatList } from 'react-native';

import { Stack } from '@grapp/stacks';

import { BodyMetrics, useTraineeBodyMetricsQuery } from 'src/api/trainee';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { PressableScale, Text } from 'src/shared';
import { CarouselGallery } from 'src/shared/components/CarouselGallery';
import { TrainingSnacks } from 'src/shared/components/TrainingSnacks/TrainingSnacks';

import { Snack } from './components/Snack';

import * as route from '../../../navigation/routes';

const useBodyMetrics = (data: BodyMetrics[] | undefined) => {
  if (!data) return undefined;
  if (data && data.length && data.length < 0) return undefined;

  const latestBodyMetrics = data[data.length - 1];

  if (!latestBodyMetrics) return undefined;

  return [
    {
      title: 'Klatka',
      value: `${data[data.length - 1]?.height}cm`,
    },
    {
      title: 'Biceps',
      value: `${data[data.length - 1]?.biceps}cm`,
    },
    {
      title: 'Talia',
      value: `${data[data.length - 1]?.waist}cm`,
    },
    {
      title: 'Biodra',
      value: `${data[data.length - 1]?.hip}cm`,
    },
    {
      title: 'Udo',
      value: `${data[data.length - 1]?.chest}cm`,
    },
    {
      title: 'Łydka',
      value: `${data[data.length - 1]?.thigh}cm`,
    },
    {
      title: 'Wzrost',
      value: `${data[data.length - 1]?.height}cm`,
    },
    {
      title: 'Waga',
      value: `${data[data.length - 1]?.weight}kg`,
    },
  ];
};

const Content = () => {
  const userInfoQuery = useGetUserInfoQuery();
  const traineeBodyMetricsQuery = useTraineeBodyMetricsQuery(userInfoQuery.data?.traineeId ?? '');

  const bodyMetrics = useBodyMetrics(traineeBodyMetricsQuery.data?.data);

  return (
    <Screen.ScrollView backgroundColor="transparent">
      <Screen.Content>
        {userInfoQuery.isLoading ? (
          <LoadingScreen />
        ) : (
          <Stack space={4}>
            <CarouselGallery />
            <Stack paddingTop={6}>
              <Text fontWeight="700" size="xxl">
                {userInfoQuery.data?.name}
              </Text>
              <Text fontWeight="400" size="sm">
                Miast | brak pola
              </Text>
              <Text fontWeight="400" size="sm">
                Rola: {userInfoQuery.data?.role}
              </Text>
            </Stack>
            {bodyMetrics ? (
              <FlatList
                scrollEnabled={false}
                numColumns={3}
                contentContainerStyle={{ gap: 8 }}
                columnWrapperStyle={{ gap: 8 }}
                data={bodyMetrics}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => <Snack value={{ title: item.title, value: item.value }} />}
              />
            ) : null}
            <Stack space={4}>
              <Text fontWeight="700" size="sm">
                Interesuje mnie trening:
              </Text>
              <TrainingSnacks data={['Joga', 'Sylwetkowy', 'Kalistenika']} />
            </Stack>
          </Stack>
        )}
      </Screen.Content>
    </Screen.ScrollView>
  );
};

export const BottomTabsProfile = () => {
  const handleEditProfile = () => goTo(route.toAccountSettings);
  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="transparent">
          <Screen.Header.Right alignY="center" paddingTop={2.5}>
            <PressableScale onPress={handleEditProfile}>
              <Text fontWeight="700" size="xs">
                Edytuj profil
              </Text>
            </PressableScale>
          </Screen.Header.Right>
        </Screen.Header>
      }
      statusBarStyle="light"
    >
      <Content />
    </Screen>
  );
};
