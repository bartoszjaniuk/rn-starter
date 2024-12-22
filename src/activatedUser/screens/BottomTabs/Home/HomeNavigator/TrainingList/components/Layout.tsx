import { PropsWithChildren } from 'react';
import { ScrollView, SectionList } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { Box, Inline, Stack } from '@grapp/stacks';

import { useBookingsQuery } from 'src/api/booking/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, PressableScale, Text, TryAgainError } from 'src/shared';

import { ShowPrevious } from './ShowPrevious';
import { Tile } from './Tile';

import * as route from '../../../../../../navigation/routes';
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

  if (bookingsQuery.data?.meta.total === 0) return noSchedulesComponent;

  const data = bookingsQuery.data?.data;

  const transformedData = splitBookingsIntoPastAndFuture(transformDataIntoBookingArrays(data));

  const handleNavigateToSearchTrainers = () => goTo(route.toSearchTrainersList);
  const handleNavigateToTrainingDetails = () => goTo(route.toHomeTrainingDetails);
  return (
    <Screen.Content alignY="between">
      {/*  FIXME: This ScrollView should be replaced with FlatList to improve performance */}
      <ScrollView>
        <Stack>
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
                    name={item.trainer.name}
                    specialization="TBD"
                    timeStart={item.availabilitySlots[0]?.start}
                    timeEnd={item.availabilitySlots[item.availabilitySlots.length - 1]?.end}
                    onPress={handleNavigateToTrainingDetails}
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
                  name={item.trainer.name}
                  specialization="TBD"
                  timeStart={item.availabilitySlots[0]?.start}
                  timeEnd={item.availabilitySlots[item.availabilitySlots.length - 1]?.end}
                  onPress={handleNavigateToTrainingDetails}
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
        {type === 'trainee' ? (
          <Stack space={2} align="right" padding={4}>
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
        ) : null}
      </ScrollView>
    </Screen.Content>
  );
};
