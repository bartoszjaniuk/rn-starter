import * as React from 'react';

import { Inline, Stack } from '@grapp/stacks';

import { useRouteParams } from 'src/core/hooks';
import { Screen } from 'src/screen';
import { Icon, PressableScale, Text } from 'src/shared';
import { TrainingSnacks } from 'src/shared/components/TrainingSnacks/TrainingSnacks';

import { DateTile } from './components/DateTile';
import { Tile } from './components/Tile';

import * as route from '../../../navigation/routes';

const Content = () => {
  const {
    bookingDescription,
    bookingName,
    city,
    date,
    timeStart,
    timeEnd,
    trainerName,
    isPastTraining,
    specializations,
    trainerNote,
  } = useRouteParams(route.toBookingDetails);

  return (
    <Screen.Content>
      <Stack space={4}>
        <Text fontWeight="400" size="xxl">
          Masz ukończony trening z
        </Text>
        <Tile name={trainerName} city={city} />
        <Inline space={6} alignY="center">
          <Inline space={2}>
            <Icon name="calendar" color="gray" svgProps={{ width: 16, height: 16 }} />
            <Text fontWeight="400" size="xs">
              {date}
            </Text>
          </Inline>
          <Inline space={2} alignY="center">
            <Icon name="clock" color="transparent" />
            {timeStart && timeEnd ? (
              <Inline alignY="center">
                <Text fontWeight="400" size="xs">
                  {timeStart}
                </Text>
                <Text fontWeight="400" size="xs">
                  -
                </Text>
                <Text fontWeight="400" size="xs">
                  {timeEnd}
                </Text>
              </Inline>
            ) : null}
          </Inline>
        </Inline>
        <DateTile dateStart={timeStart} dateEnd={timeEnd} description={bookingDescription} name={bookingName} />
        <Stack>
          <Text fontWeight="500" size="sm">
            Rodzaj treningu:
          </Text>
        </Stack>
        {specializations && specializations?.length > 0 ? <TrainingSnacks data={specializations} /> : null}
        {trainerNote ? (
          <Stack space={2}>
            <Text fontWeight="500" size="sm">
              Wiadomość od trenera
            </Text>
            <Text>{trainerNote}</Text>
          </Stack>
        ) : null}
        {isPastTraining ? null : (
          <>
            <PressableScale>
              <Inline alignY="center" space={4}>
                <Icon name="pencil" svgProps={{ width: 20, height: 20 }} />
                <Text fontWeight="400" size="xs">
                  Zmień termin
                </Text>
              </Inline>
            </PressableScale>

            <PressableScale>
              <Inline alignY="center" space={4}>
                <Icon name="closeX" svgProps={{ width: 20, height: 20 }} />
                <Text fontWeight="400" size="xs">
                  Odwołaj zaplanowany trening
                </Text>
              </Inline>
            </PressableScale>
          </>
        )}
      </Stack>
    </Screen.Content>
  );
};

export const BookingDetails = () => {
  return (
    <Screen statusBarStyle="light" backgroundColor="black" HeaderComponent={<Screen.Header variant="transparent" />}>
      <Content />
    </Screen>
  );
};
