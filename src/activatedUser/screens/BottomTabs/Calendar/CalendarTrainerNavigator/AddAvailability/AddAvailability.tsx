import * as React from 'react';

import { Box } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useTrainerSetAvailabilityMutation } from 'src/api/trainer';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goBack } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { Button, PressableScale, Text, TryAgainError } from 'src/shared';
import { getAllDatesForCurrentMonth } from 'src/shared/utils/getAllDatesForCurrentMonth';
import { useAuthStore } from 'src/store/auth';

import { AvailabilityFormFieldValues, Form, availabilityFormSchema } from './components/Form';

import { AvailabilityParams } from '../../Calendar';

function transformData(data: {
  title: string;
  date: string;
  start: string;
  end: string;
  recurrence: string;
  place: string;
}) {
  const { date, start, end, recurrence, place } = data;

  return [
    {
      start: `${date}T${start}`,
      end: `${date}T${end}`,
      recurrence: recurrence === 'never' ? null : recurrence,
      place,
    },
  ];
}

const Content = () => {
  const { navigationData } = useNavigator<AvailabilityParams>();
  const auth = useAuthStore();

  const trainerSetAvailabilityMutation = useTrainerSetAvailabilityMutation(auth.user?.trainerId || '');

  const availableSlots = getAllDatesForCurrentMonth(navigationData.month);

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
    const transformedData = transformData({ ...data, place: data.title });
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
    [
      isValid,
      handleSubmit,
      trainerSetAvailabilityMutation.mutate,
      resetForm,
      isDirty,
      // trainerAvailabilitiesQuery.data?.data,
    ],
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
      HeaderComponent={
        <Screen.Header variant="primary">
          <Screen.Header.Left>
            <PressableScale onPress={goBack}>
              <Text fontWeight="700" size="xs" color="error">
                Anuluj
              </Text>
            </PressableScale>
          </Screen.Header.Left>
          <Screen.Header.Right>
            <PressableScale isDisabled={true} onPress={() => {}}>
              <Text fontWeight="700" size="xs" color="disabled">
                Wyczyść
              </Text>
            </PressableScale>
          </Screen.Header.Right>
        </Screen.Header>
      }
    >
      <Content />
    </Screen>
  );
};
