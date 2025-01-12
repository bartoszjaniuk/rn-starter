import * as React from 'react';
import { Alert, AlertOptions } from 'react-native';
import { Easing } from 'react-native-reanimated';
import StarRating from 'react-native-star-rating-widget';
import { useStyles } from 'react-native-unistyles';

import { Inline, Stack } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCancelBookingMutation, useRateBookingMutation, useSendNoteMutation } from 'src/api/booking/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { useRouteParams } from 'src/core/hooks';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Button, Icon, PressableScale, Text, TextInput } from 'src/shared';
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

const Rate = ({ onRateTraining, defaultRating }: { onRateTraining: (rate: number) => void; defaultRating: number }) => {
  const [rating, setRating] = React.useState(defaultRating);
  const handleRateTraining = () => onRateTraining(rating);

  const { theme } = useStyles();
  return (
    <Stack space={8}>
      <Stack space={2}>
        <Text fontWeight="500" size="sm">
          {defaultRating ? 'Ocena treningu' : 'Oceń trening'}
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
            onChange={(value) => {
              if (defaultRating) return;
              setRating(value);
            }}
            color={theme.colors.primary}
          />
          <Text fontWeight="500" size="md">
            {Number(rating).toFixed(1)}
          </Text>
        </Inline>
      </Stack>
      {!defaultRating && rating ? <Button onPress={handleRateTraining}>Oceń</Button> : null}
    </Stack>
  );
};

export const BookingDetails = () => {
  const { role } = useRouteParams(route.toBookingDetails);

  return (
    <Screen statusBarStyle="light" backgroundColor="black" HeaderComponent={<Screen.Header variant="transparent" />}>
      {role === 'trainee' ? <TraineeContent /> : <TrainerContent />}
    </Screen>
  );
};

const TraineeContent = () => {
  const {
    isPastTraining,
    name,
    id,
    role,
    city,
    date,
    timeStart,
    timeEnd,
    place,
    bookingName,
    type,
    trainerNote,
    bookingId,
    rating,
  } = useRouteParams(route.toBookingDetails);

  const handleNavigateToProfile = () => {
    goTo(route.toBookingProfile, {
      id,
      role,
      specializations: [], // IT IS NOT USED HERE
    });
  };

  const cancelBookingMutation = useCancelBookingMutation();
  const rateBookingMutation = useRateBookingMutation(bookingId);

  const alert = useAlert();

  const handleCancelTraining = () => {
    alert(() => cancelBookingMutation.mutate(bookingId));
  };

  const onRateTraining = (rate: number) => {
    rateBookingMutation.mutate({ bookingRate: rate });
  };

  if (cancelBookingMutation.isPending || rateBookingMutation.isPending) return <LoadingScreen />;

  return (
    <Screen.Content>
      <Stack space={4}>
        <Text fontWeight="400" size="xxl">
          {isPastTraining ? 'Masz ukończony trening z' : 'Masz zaplanowany trening z'}
        </Text>
        <Tile name={name} city={city} onPress={handleNavigateToProfile} />
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
            {/* <PressableScale>
              <Inline alignY="center" space={4}>
                <Icon name="pencil" svgProps={{ width: 20, height: 20 }} />
                <Text fontWeight="400" size="xs">
                  Zmień termin
                </Text>
              </Inline>
            </PressableScale> */}
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
        {rating ? <Rate onRateTraining={onRateTraining} defaultRating={rating} /> : null}
      </Stack>
    </Screen.Content>
  );
};

const TrainerContent = () => {
  const {
    isPastTraining,
    name,
    city,
    id,
    role,
    date,
    timeStart,
    timeEnd,
    place,
    bookingName,
    type,
    trainerNote,
    bookingId,
    rating,
  } = useRouteParams(route.toBookingDetails);

  const handleNavigateToTrainerProfile = () => {
    goTo(route.toBookingProfile, {
      id,
      role,
      specializations: [], // IT IS NOT USED HERE
    });
  };

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
        {rating ? <Rate onRateTraining={() => null} defaultRating={rating} /> : null}

        {trainerNote ? (
          <Stack space={2}>
            <Text fontWeight="500" size="sm">
              Notatka dla trenującego
            </Text>
            <Text>{trainerNote}</Text>
          </Stack>
        ) : (
          <Note currentNote={trainerNote} bookingId={bookingId} />
        )}

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
          </>
        )}
      </Stack>
    </Screen.Content>
  );
};

const noteFormSchema = z.object({
  note: z.string().min(1, 'Pole jest wymagane'),
});

type NoteFormFieldValues = z.infer<typeof noteFormSchema>;

const Note = ({ currentNote, bookingId }: { currentNote?: string; bookingId: string }) => {
  const sendNoteMutation = useSendNoteMutation(bookingId);

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<NoteFormFieldValues>({
    mode: 'onChange',
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      note: currentNote,
    },
  });

  const onSubmit = (data: NoteFormFieldValues) => {
    sendNoteMutation.mutate({ bookingNote: data.note });
  };

  return (
    <Stack space={4}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            multiline={true}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            label="Notatka"
            placeholder="Napisz notatkę dla trenującego"
          />
        )}
        name="note"
      />
      {isDirty && !errors.note ? (
        <Button isLoading={sendNoteMutation.isPending} isDisabled={!isValid} onPress={handleSubmit(onSubmit)}>
          Zapisz
        </Button>
      ) : null}
    </Stack>
  );
};
