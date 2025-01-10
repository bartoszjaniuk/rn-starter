import * as React from 'react';
import { Alert, AlertOptions } from 'react-native';
import { Easing } from 'react-native-reanimated';
import StarRating, { StarIconProps } from 'react-native-star-rating-widget';
import Svg, { Path } from 'react-native-svg';
import { useStyles } from 'react-native-unistyles';

import { Box, Inline, Stack } from '@grapp/stacks';

import { useCancelBookingMutation, useRateBookingMutation } from 'src/api/booking/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { useRouteParams } from 'src/core/hooks';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Button, Icon, PressableScale, Text } from 'src/shared';
import { TrainingSnacks } from 'src/shared/components/TrainingSnacks/TrainingSnacks';
import { capitalizeFirstLetter } from 'src/shared/utils/capitalizeFirstLetter';

import { DateTile } from './components/DateTile';
import { Tile } from './components/Tile';

import * as route from '../../../navigation/routes';

type AlertProps = {
  message?: string;
  options?: AlertOptions;
};

export const useAlert = (props: AlertProps = {}) => {
  const { message, options } = props;
  const openAlert = React.useMemo(
    () => (onConfirm?: VoidFunction) => {
      Alert.alert(
        `Czy na pewno chcesz anulować trening?`,
        message,
        [
          { text: 'Zamknij', style: 'cancel' },
          { text: 'Potwierdź', style: 'default', onPress: onConfirm },
        ],
        options,
      );
    },
    [message, options],
  );
  return openAlert;
};

const Content = () => {
  const {
    place,
    bookingName,
    date,
    timeStart,
    timeEnd,
    isPastTraining,
    type,
    city,
    name,
    trainerNote,
    bookingId,
    role,
    id,
    rating,
  } = useRouteParams(route.toBookingDetails);
  const cancelBookingMutation = useCancelBookingMutation();
  const rateBookingMutation = useRateBookingMutation(bookingId);

  const alert = useAlert();

  const handleCancelTraining = () => {
    alert(() => cancelBookingMutation.mutate(bookingId));
  };

  const onRateTraining = (rate: number) => {
    rateBookingMutation.mutate({ bookingRate: rate });
  };

  const handleNavigateToTrainerProfile = () => {
    goTo(route.toBookingProfile, {
      id,
      role,
      specializations: [], // IT IS NOT USED HERE
    });
  };

  if (cancelBookingMutation.isPending || rateBookingMutation.isPending) return <LoadingScreen />;

  return (
    <Screen.Content>
      <Stack space={4}>
        <Text fontWeight="400" size="xxl">
          {isPastTraining ? 'Masz ukończony trening z' : 'Masz zaplanowany trening z'}
        </Text>
        <Tile name={name} city={city} onPress={handleNavigateToTrainerProfile} />
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
        <DateTile dateStart={timeStart} dateEnd={timeEnd} description={place} name={bookingName} />
        <Stack>
          <Text fontWeight="500" size="sm">
            Rodzaj treningu:
          </Text>
        </Stack>
        {type ? <TrainingSnacks data={[capitalizeFirstLetter(type)]} /> : null}
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

            <PressableScale onPress={handleCancelTraining}>
              <Inline alignY="center" space={4}>
                <Icon name="closeX" svgProps={{ width: 20, height: 20 }} />
                <Text fontWeight="400" size="xs">
                  Odwołaj zaplanowany trening
                </Text>
              </Inline>
            </PressableScale>
          </>
        )}
        {role === 'trainee' && !rating ? <Rate onRateTraining={onRateTraining} /> : null}
      </Stack>
    </Screen.Content>
  );
};

const Rate = ({ onRateTraining }: { onRateTraining: (rate: number) => void }) => {
  const [rating, setRating] = React.useState(0);
  const handleRateTraining = () => onRateTraining(rating);

  const { theme } = useStyles();
  return (
    <Stack space={8}>
      <Stack space={2}>
        <Text fontWeight="500" size="sm">
          Oceń trening
        </Text>
        <Inline alignY="center" alignX="between">
          <StarRating
            emptyColor="#D5D5D5"
            maxStars={5}
            animationConfig={{
              easing: Easing.elastic(2),
              duration: 300,
              scale: 1,
              delay: 300,
            }}
            starSize={36}
            enableHalfStar={false}
            rating={rating}
            onChange={setRating}
            color={theme.colors.primary}
          />
          <Text fontWeight="500" size="md">
            {Number(rating).toFixed(1)}
          </Text>
        </Inline>
      </Stack>
      {rating ? <Button onPress={handleRateTraining}>Oceń</Button> : null}
    </Stack>
  );
};

export const BookingDetails = () => {
  return (
    <Screen statusBarStyle="light" backgroundColor="black" HeaderComponent={<Screen.Header variant="transparent" />}>
      <Content />
    </Screen>
  );
};
