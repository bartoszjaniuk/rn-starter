import { PropsWithChildren } from 'react';
import { ScrollView, SectionList } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { Box, FloatBox, Inline, Stack } from '@grapp/stacks';

import { useBookingsQuery } from 'src/api/booking/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, PressableScale, Text, TryAgainError } from 'src/shared';
import { capitalizeFirstLetter } from 'src/shared/utils/capitalizeFirstLetter';

import { ShowPrevious } from './ShowPrevious';
import { Tile } from './Tile';

import * as route from '../../../../../../navigation/routes';
import { Booking } from '../models/booking.model';
import { splitBookingsIntoPastAndFuture } from '../utils/splitBookingsIntoPastAndFuture';
import { transformDataIntoBookingArrays } from '../utils/transformDataIntoBookingArrays';

type Props = PropsWithChildren<{
  type: 'trainee' | 'trainer';
  noSchedulesComponent: React.ReactNode;
}>;

export const Layout = (props: Props) => {
  const { theme } = useStyles();

  const { noSchedulesComponent, type } = props;
  const bookingsQuery = useBookingsQuery();

  if (bookingsQuery.isLoading) return <LoadingScreen />;

  if (bookingsQuery.isError) return <TryAgainError queryName="bookings" onRetry={bookingsQuery.refetch} />;

  if (bookingsQuery.data?.meta.total === 0)
    return (
      <Stack flex="fluid">
        <FloatBox offset={0}>{noSchedulesComponent}</FloatBox>
        {type === 'trainee' ? (
          <FloatBox right={0} bottom={0}>
            <Stack space={2} align="right" padding={4}>
              <PressableScale style={{ width: 48, height: 48 }} onPress={() => goTo(route.toSearchTrainersList)}>
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
          </FloatBox>
        ) : null}
      </Stack>
    );

  const data = bookingsQuery.data?.data;

  const transformedData = splitBookingsIntoPastAndFuture(transformDataIntoBookingArrays(data));

  const navigateToTrainingDetails = (booking: Booking, isPast: boolean) => {
    if (type === 'trainee') {
      goTo(route.toBookingDetails, {
        id: booking.trainer.id,
        name: booking.trainer.name,
        city: booking.trainer.city,
        bookingId: booking.id,
        bookingName: `${capitalizeFirstLetter(booking.type)} z ${booking.trainer.name}`,
        date: booking.date,
        timeStart: booking.availabilitySlots[0]?.start ?? '',
        timeEnd: booking.availabilitySlots[booking.availabilitySlots.length - 1]?.end ?? '',
        type: booking.type,
        trainerNote: booking.note ?? '',
        isPastTraining: isPast,
        role: type,
        place: booking.place,
        rating: booking.averageRating ?? 0,
      });
    } else {
      goTo(route.toBookingDetails, {
        id: booking.trainee.id,
        name: booking.trainee.name,
        city: booking.trainee.city,
        bookingId: booking.id,
        bookingName: `${capitalizeFirstLetter(booking.type)} z ${booking.trainee.name}`,
        date: booking.date,
        timeStart: booking.availabilitySlots[0]?.start ?? '',
        timeEnd: booking.availabilitySlots[booking.availabilitySlots.length - 1]?.end ?? '',
        type: booking.type,
        trainerNote: booking.note ?? '',
        isPastTraining: isPast,
        role: type,
        place: booking.place,
        rating: booking.averageRating ?? 0,
      });
    }
  };

  return (
    <Screen.Content alignY="between" flex="fluid">
      {/*  FIXME: This ScrollView should be replaced with FlatList to improve performance */}
      <ScrollView>
        <Stack>
          {transformedData.pastBookings.length > 0 ? (
            <ShowPrevious
              children={
                <SectionList
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <Box height={12} />}
                  sections={transformedData.pastBookings.map(({ date, trainings }) => ({
                    title: date,
                    data: trainings,
                  }))}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Tile
                      key={item.id}
                      date={item.date}
                      name={type === 'trainee' ? item.trainer.name : item.trainee.name}
                      specialization={item.type}
                      timeStart={item.availabilitySlots[0]?.start}
                      timeEnd={item.availabilitySlots[item.availabilitySlots.length - 1]?.end}
                      onPress={() => navigateToTrainingDetails(item, true)}
                      isPast={true}
                    />
                  )}
                  renderSectionHeader={({ section: { title } }) => (
                    <Inline alignX="center" paddingY={4}>
                      <Text fontWeight="500" size="xs">
                        {title}
                      </Text>
                    </Inline>
                  )}
                />
              }
            />
          ) : null}

          <Box>
            <SectionList
              scrollEnabled={false}
              ItemSeparatorComponent={() => <Box height={12} />}
              sections={transformedData.futureBookings.map(({ date, trainings }) => ({
                title: date,
                data: trainings,
              }))}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Tile
                  key={item.id}
                  date={item.date}
                  name={type === 'trainee' ? item.trainer.name : item.trainee.name}
                  specialization={item.type}
                  timeStart={item.availabilitySlots[0]?.start}
                  timeEnd={item.availabilitySlots[item.availabilitySlots.length - 1]?.end}
                  onPress={() => navigateToTrainingDetails(item, false)}
                  isPast={false}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Inline alignX="center" paddingY={4}>
                  <Text fontWeight="500" size="xs">
                    {title}
                  </Text>
                </Inline>
              )}
            />
          </Box>
        </Stack>
      </ScrollView>
      {type === 'trainee' ? (
        <FloatBox right={0} bottom={0}>
          <Stack space={2} align="right" padding={4}>
            <PressableScale style={{ width: 48, height: 48 }} onPress={() => goTo(route.toSearchTrainersList)}>
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
        </FloatBox>
      ) : null}
    </Screen.Content>
  );
};
