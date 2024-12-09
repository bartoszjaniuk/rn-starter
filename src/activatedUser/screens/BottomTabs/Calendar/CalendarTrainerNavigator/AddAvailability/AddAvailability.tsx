import * as React from 'react';

import { Inline, Stack } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';

import { Control, Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { getPastPresentFutureDates } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';
import { DateSchedule, useTrainerAvailabilitiesQuery, useTrainerSetAvailabilityMutation } from 'src/api/trainer';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { goBack } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { PressableScale, SelectDropdownRN, Text, TextInput } from 'src/shared';

import { AvailabilityParams } from '../../Calendar';

const availabilityFormSchema = z.object({
  title: z.string().min(1, 'Pole jest wymagane'),
  date: z.string().min(1, 'Pole jest wymagane'),
  start: z.string().min(1, 'Pole jest wymagane'),
  end: z.string().min(1, 'Pole jest wymagane'),
  duration: z.string().min(1, 'Pole jest wymagane'),
  repetition: z.string().min(1, 'Pole jest wymagane').trim(),
});

type AvailabilityFormFieldValues = z.infer<typeof availabilityFormSchema>;

type Props = {
  control: Control<AvailabilityFormFieldValues>;
  availableSlots: string[];
  data: DateSchedule | undefined;
  weekDate: string;
};

const Form = (props: Props) => {
  const { control, availableSlots, data, weekDate } = props;
  const { updateNavigationData } = useNavigator<AvailabilityParams>();

  const startHours = React.useMemo(() => {
    if (!data) return [];
    return data[weekDate].map((slot) => ({
      label: slot.start,
      value: slot.start,
    }));
  }, [data, weekDate]);

  const endHours = React.useMemo(() => {
    if (!data) return [];
    return data[weekDate].map((slot) => ({
      label: slot.end,
      value: slot.end,
    }));
  }, [data, weekDate]);

  return (
    <Stack space={2} paddingTop={6}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            isRequired={true}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            label="Nazwa obiektu"
            placeholder="Podaj nazwę obiektu"
            isError={!!error}
            errorMessage={error?.message}
          />
        )}
        name="title"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SelectDropdownRN
            isRequired={true}
            error={error}
            selectedValue={value}
            onValueChange={(v: string | null) => {
              if (v === null) onChange('');
              else {
                updateNavigationData({ weekDate: v });

                onChange(v);
              }
            }}
            label="Data"
            placeholder={value}
            options={availableSlots.map((date) => ({
              label: date,
              value: date,
            }))}
          />
        )}
        name="date"
      />

      <Inline space={3}>
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <SelectDropdownRN
              isRequired={true}
              error={error}
              selectedValue={value}
              onValueChange={(v: string | null) => {
                if (v === null) onChange('');
                else onChange(v);
              }}
              label="Godzina od"
              placeholder="Podaj godzine"
              options={startHours}
            />
          )}
          name="repetition"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <SelectDropdownRN
              isRequired={true}
              error={error}
              selectedValue={value}
              onValueChange={(v: string | null) => {
                if (v === null) onChange('');
                else onChange(v);
              }}
              label="Godzina do"
              placeholder="Podaj godzine"
              options={endHours}
            />
          )}
          name="repetition"
        />
      </Inline>
      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SelectDropdownRN
            isRequired={true}
            error={error}
            selectedValue={value}
            onValueChange={(v: string | null) => {
              if (v === null) onChange('');
              else onChange(v);
            }}
            label="Powtarzaj"
            placeholder="Nigdy"
            options={[
              { label: 'Nigdy', value: 'never' },
              { label: 'Codziennie', value: 'daily' },
              { label: 'Co tydzień', value: 'weekly' },
              { label: 'Co 2 tygodnie', value: 'biweekly' },
              { label: 'Co 1 miesiąc', value: 'monthly' },
            ]}
          />
        )}
        name="repetition"
      />
    </Stack>
  );
};

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
    formState: { isValid },
  } = useForm<AvailabilityFormFieldValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      title: '',
      date: navigationData.weekDate,
      start: '',
      end: '',
      duration: '',
      repetition: 'never',
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;
    trainerSetAvailabilityMutation.mutate({ start: data.start, end: data.end, recurrence: data.repetition });
  });

  Screen.useHeader({
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
        <PressableScale isDisabled={!isValid} onPress={onSubmit}>
          <Text fontWeight="700" size="xs" color="primary">
            Dodaj
          </Text>
        </PressableScale>
      </Screen.Header.Right>
    ),
  });

  return (
    <Screen.Content>
      <Form
        availableSlots={availableSlots}
        data={trainerAvailabilitiesQuery.data?.data}
        control={control}
        weekDate={navigationData.weekDate}
      />
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
