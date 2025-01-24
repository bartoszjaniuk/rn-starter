import * as React from 'react';
import { FlatList, View } from 'react-native';

import { Inline, Stack } from '@grapp/stacks';

import { BodyMetrics, useTraineeBodyMetricsQuery } from 'src/api/trainee';
import { useTrainersQuery } from 'src/api/trainer';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, PressableScale, Text, getQueryStringFromParams, replaceApiHost } from 'src/shared';
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
  const isTrainee = userInfoQuery.data?.role === 'trainee';
  const queryString = getQueryStringFromParams({ trainerId: userInfoQuery.data?.trainerId ?? '' });
  const trainersQuery = useTrainersQuery(queryString, !isTrainee);

  const bodyMetrics = useBodyMetrics(traineeBodyMetricsQuery.data?.data);

  if (userInfoQuery.isLoading || traineeBodyMetricsQuery.isLoading || trainersQuery.isLoading) return <LoadingScreen />;

  return (
    <Screen.ScrollView backgroundColor="transparent">
      <Screen.Content>
        <Stack space={4}>
          <CarouselGallery
            images={
              userInfoQuery.data?.profileImage
                ? [{ id: '123', uri: replaceApiHost(userInfoQuery.data?.profileImage) }]
                : [
                    {
                      id: '1',
                      uri: 'https://avatar.iran.liara.run/public/1',
                    },
                  ]
            }
          />
          <Stack paddingTop={6} space={1}>
            <Text fontWeight="700" size="xxl">
              {userInfoQuery.data?.name}
            </Text>
            <Text fontWeight="400" size="sm">
              {userInfoQuery.data?.city}
            </Text>

            {isTrainee ? null : (
              <View style={{ flexDirection: 'row', gap: 24, width: '100%' }}>
                <Inline alignY="center" space={1}>
                  <Icon name="phone" color="transparent" />
                  <Text fontWeight="400" size="sm">
                    {trainersQuery.data?.data[0]?.phoneNumber}
                  </Text>
                </Inline>
                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', flex: 1 }}>
                  <Icon name="mail" color="transparent" />
                  <Text fontWeight="400" size="sm" numberOfLines={1} ellipsizeMode="tail">
                    {userInfoQuery.data?.email}
                  </Text>
                </View>
              </View>
            )}
            <Inline space={1}>
              <Text fontWeight="400" size="sm">
                Rola:
              </Text>
              <Text fontWeight="500" size="sm" color="primary">
                {isTrainee ? 'Trenujący' : 'Trener'}
              </Text>
            </Inline>
          </Stack>
          {bodyMetrics ? (
            <FlatList
              onRefresh={traineeBodyMetricsQuery.refetch}
              refreshing={traineeBodyMetricsQuery.isRefetching}
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
              {isTrainee ? 'Interesuje mnie trening:' : 'Przeprowadzam trening:'}
            </Text>
            <TrainingSnacks data={['Joga', 'Sylwetkowy', 'Kalistenika']} />
          </Stack>
        </Stack>
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
