import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useTrainerAvailabilitiesQuery, useTrainerBookTrainingMutation } from 'src/api/trainer';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goBack } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { PressableScale, Text, TryAgainError } from 'src/shared';

import { Form } from './components/Form';

import { AvailabilityParams } from '../../Availability';
import { getPastPresentFutureDates } from '../_internals/utils/getPastPresentFutureDates';

export const reservationFormSchema = z.object({
  date: z.string().min(1, 'Pole jest wymagane'),
  duration: z.string(),
  bookingDate: z.string().min(1, 'Pole jest wymagane'),
});

export type ReservationFormFieldValues = z.infer<typeof reservationFormSchema>;

const Content = () => {
  const { navigationData } = useNavigator<AvailabilityParams>();

  const { today, lastDay } = getPastPresentFutureDates();

  const trainerAvailabilitiesQuery = useTrainerAvailabilitiesQuery({
    trainerId: navigationData.trainerId,
    date: { from: today, to: lastDay },
  });

  const availableSlots = Object.keys(trainerAvailabilitiesQuery.data?.data ?? []);

  const {
    control,
    reset,
    formState: { isValid },
    watch,
  } = useForm<ReservationFormFieldValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      date: navigationData.weekDate,
      duration: '15',
      bookingDate: '',
    },
  });

  const date = watch('date');
  const duration = watch('duration');

  const slots = trainerAvailabilitiesQuery.data?.data?.[date];

  const trainerBookTrainingMutation = useTrainerBookTrainingMutation(navigationData.trainerId, goBack);

  const handleReservation = () => {
    trainerBookTrainingMutation.mutate({
      traineeId: navigationData.traineeId,
      availabilitySlotsIds: navigationData.availabilitySlotsIds,
    });
    reset();
  };

  Screen.useHeader(
    {
      renderRight: () => (
        <Screen.Header.Right>
          <PressableScale onPress={handleReservation} isDisabled={!isValid}>
            <Text fontWeight="700" size="xs" color={isValid ? 'primary' : 'disabled'}>
              Rezerwuj
            </Text>
          </PressableScale>
        </Screen.Header.Right>
      ),
    },
    [reset, trainerBookTrainingMutation.mutate, isValid],
  );

  if (trainerAvailabilitiesQuery.isLoading || trainerBookTrainingMutation.isPending) return <LoadingScreen />;
  if (trainerBookTrainingMutation.isError)
    return <TryAgainError onRetry={handleReservation} queryName="trainerBookTraining" />;

  return (
    <Screen.Content>
      <Form control={control} availableSlots={availableSlots} slots={slots} duration={duration} />
    </Screen.Content>
  );
};

export const SearchTrainersAvailabilityReservation = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="primary" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
