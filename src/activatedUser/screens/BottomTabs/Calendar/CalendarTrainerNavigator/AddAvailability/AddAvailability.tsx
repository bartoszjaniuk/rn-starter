import * as React from 'react';

import { Box } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { getPastPresentFutureDates } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';
import { useTrainerAvailabilitiesQuery, useTrainerSetAvailabilityMutation } from 'src/api/trainer';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goBack } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { Button, PressableScale, Text, TryAgainError } from 'src/shared';

import { AvailabilityFormFieldValues, Form, availabilityFormSchema } from './components/Form';

import { AvailabilityParams } from '../../Calendar';

function transformData(data: { title: string; date: string; start: string; end: string; recurrence: string }) {
  const { date, start, end, recurrence } = data;

  return [
    {
      start: `${date}T${start}`,
      end: `${date}T${end}`,
      recurrence: recurrence === 'never' ? null : recurrence,
    },
  ];
}

const Content = () => {
  const { navigationData } = useNavigator<AvailabilityParams>();
  const { today, lastDay } = getPastPresentFutureDates();
  const userInfoQuery = useGetUserInfoQuery();

  const trainerAvailabilitiesQuery = useTrainerAvailabilitiesQuery({
    trainerId: navigationData.trainerId,
    date: { from: today, to: lastDay },
  });

  const trainerSetAvailabilityMutation = useTrainerSetAvailabilityMutation(userInfoQuery.data?.trainerId || '');

  const availableSlots = Object.keys(trainerAvailabilitiesQuery.data?.data ?? []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
    watch,
  } = useForm<AvailabilityFormFieldValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      title: '',
      date: navigationData.weekDate,
      start: '',
      end: '',
      recurrence: 'never',
    },
  });

  const startHour = watch('start');
  const endHour = watch('end');
  const resetForm = React.useCallback(() => reset({ start: undefined, end: undefined, title: '' }), [reset]);

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;
    const transformedData = transformData(data);
    trainerSetAvailabilityMutation.mutate(transformedData);
  });

  Screen.useHeader(
    {
      isModal: true,
      renderLeft: () => (
        <Screen.Header.Left>
          <PressableScale onPress={goBack}>
            <Text fontWeight="700" size="xs" color="error">
              Anuluj
            </Text>
          </PressableScale>
        </Screen.Header.Left>
      ),
      renderRight: () => (
        <Screen.Header.Right>
          <PressableScale isDisabled={!isDirty} onPress={resetForm}>
            <Text fontWeight="700" size="xs" color={!isDirty ? 'disabled' : 'primary'}>
              Wyczyść
            </Text>
          </PressableScale>
        </Screen.Header.Right>
      ),
    },
    [isValid, handleSubmit, trainerSetAvailabilityMutation.mutate, resetForm, isDirty],
  );

  if (trainerSetAvailabilityMutation.isPending) return <LoadingScreen />;

  if (trainerSetAvailabilityMutation.isError) return <TryAgainError queryName="trainerSetAvailability" />;

  return (
    <Screen.Content>
      <Form startHour={startHour} endHour={endHour} availableSlots={availableSlots} control={control} />
      <Box paddingTop={4}>
        <Button onPress={onSubmit}>Dodaj</Button>
      </Box>
    </Screen.Content>
  );
};

export const CalendarTrainerAddAvailability = () => {
  return (
    <Screen
      backgroundColor="black"
      statusBarStyle="light"
      HeaderComponent={<Screen.Header title="Dodaj dostępność" variant="primary" />}
    >
      <Content />
    </Screen>
  );
};
