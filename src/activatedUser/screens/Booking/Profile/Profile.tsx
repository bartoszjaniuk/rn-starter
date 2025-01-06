import * as React from 'react';
import { FlatList, View } from 'react-native';

import { Box, Inline, Stack } from '@grapp/stacks';

import { BodyMetrics, useTraineeBodyMetricsQuery, useTraineeQuery } from 'src/api/trainee';
import { useTrainersQuery } from 'src/api/trainer';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { useRouteParams } from 'src/core/hooks';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, PressableScale, Text, TryAgainError, getQueryStringFromParams, replaceApiHost } from 'src/shared';
import { CarouselGallery } from 'src/shared/components/CarouselGallery';
import { TrainingSnacks } from 'src/shared/components/TrainingSnacks/TrainingSnacks';

import * as route from '../../../navigation/routes';
import { Snack } from '../../BottomTabs/Profile/components/Snack';

const TrainerContent = () => {
  const routeParams = useRouteParams(route.toBookingProfile);
  const queryString = getQueryStringFromParams({ trainerId: routeParams.id });
  const trainersQuery = useTrainersQuery(queryString);

  const images = React.useMemo(
    () =>
      trainersQuery.data?.data[0]?.images.map((img) => {
        const char = 'file/';
        const index = img.indexOf(char);
        const id = img.slice(index + char.length);

        return { id, uri: replaceApiHost(img) };
      }),
    [trainersQuery.data?.data],
  );

  if (trainersQuery.isPending) return <LoadingScreen />;

  if (trainersQuery.isError) {
    return <TryAgainError queryName="trainers" onRetry={trainersQuery.refetch} isLoading={trainersQuery.isLoading} />;
  }

  if (trainersQuery.data.data.length === 0) {
    return <Text>Brak danych do wyświetlenia 🗿</Text>;
  }

  const data = trainersQuery.data?.data[0];

  return (
    <Screen.ScrollView backgroundColor="transparent">
      <Screen.Content>
        <Stack space={3}>
          <CarouselGallery images={images} />
          <Stack space={2} paddingTop={8}>
            <Box>
              <Inline alignX="between">
                <Text fontWeight="700" size="xxl">
                  {data?.name}
                </Text>
                <Inline alignY="center" space={1}>
                  <Icon name="star" color="transparent" />
                  <Text fontWeight="500" size="lg">
                    {data?.averageBookingRating || '3.14'}
                  </Text>
                </Inline>
              </Inline>
              <Text fontWeight="400" size="sm">
                {data?.city}
              </Text>
            </Box>
            <View style={{ flexDirection: 'row', gap: 24, width: '100%' }}>
              <Inline alignY="center" space={1}>
                <Icon name="phone" color="transparent" />
                <Text fontWeight="400" size="sm">
                  {data?.phoneNumber}
                </Text>
              </Inline>
              <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', flex: 1 }}>
                <Icon name="mail" color="transparent" />
                <Text fontWeight="400" size="sm" numberOfLines={1} ellipsizeMode="tail">
                  {data?.email}
                </Text>
              </View>
            </View>
          </Stack>
          <Stack space={2}>
            <Text fontWeight="700" size="sm">
              Przeprowadzam trening:
            </Text>
            <TrainingSnacks data={data?.specializations || []} />
          </Stack>
          <Stack space={2}>
            <Text fontWeight="700" size="sm">
              O mnie:
            </Text>
            <Text fontWeight="400" size="sm" color="white">
              Jestem certyfikowanym trenerem personalnym z pasją do pomagania innym w osiąganiu ich celów fitness.
              Specjalizuję się w spersonalizowanych planach treningowych i wsparciu motywacyjnym, które pomagają
              zwiększać siłę, poprawiać kondycję i budować zdrowe nawyki na długie lata.
            </Text>
          </Stack>
        </Stack>
      </Screen.Content>
    </Screen.ScrollView>
  );
};

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

const TraineeContent = () => {
  const routeParams = useRouteParams(route.toBookingProfile);
  const queryString = getQueryStringFromParams({ traineeId: routeParams.id });
  const traineeQuery = useTraineeQuery(queryString);

  const traineeBodyMetricsQuery = useTraineeBodyMetricsQuery(routeParams.id ?? '');

  const bodyMetrics = useBodyMetrics(traineeBodyMetricsQuery.data?.data);

  const images = React.useMemo(
    () =>
      traineeQuery.data?.data[0]?.images.map((img) => {
        const char = 'file/';
        const index = img.indexOf(char);
        const id = img.slice(index + char.length);

        return { id, uri: replaceApiHost(img) };
      }),
    [traineeQuery.data?.data],
  );

  if (traineeQuery.isLoading || traineeBodyMetricsQuery.isLoading) return <LoadingScreen />;

  if (traineeQuery.isError) {
    return <TryAgainError queryName="trainers" onRetry={traineeQuery.refetch} isLoading={traineeQuery.isLoading} />;
  }

  if (traineeQuery.data?.data.length === 0) {
    return <Text>Brak danych do wyświetlenia 🗿</Text>;
  }

  const data = traineeQuery.data?.data[0];

  return (
    <Screen.ScrollView backgroundColor="transparent">
      <Screen.Content>
        <Stack space={3}>
          <CarouselGallery images={images} />
          <Stack paddingTop={6}>
            <Text fontWeight="700" size="xxl">
              {data?.name}
            </Text>
            <Text fontWeight="400" size="sm">
              {data?.city}
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
          <Stack space={2}>
            <Text fontWeight="700" size="sm">
              Interesuje mnie trening:
            </Text>
            <TrainingSnacks data={data?.specializations || []} />
          </Stack>
        </Stack>
      </Screen.Content>
    </Screen.ScrollView>
  );
};

export const BookingProfile = () => {
  const routeParams = useRouteParams(route.toBookingProfile);

  const goToCalendar = () =>
    goTo(route.toSearchTrainersAvailability, {
      trainerId: routeParams.id,
      specializations: routeParams.specializations,
    });
  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="transparent">
          {routeParams.role === 'trainee' ? (
            <Screen.Header.Right>
              <PressableScale onPress={goToCalendar}>
                <Text fontWeight="700" size="xs" color="primary">
                  Zobacz kalendarz
                </Text>
              </PressableScale>
            </Screen.Header.Right>
          ) : null}
        </Screen.Header>
      }
      statusBarStyle="light"
    >
      {routeParams.role === 'trainer' ? <TraineeContent /> : <TrainerContent />}
    </Screen>
  );
};
