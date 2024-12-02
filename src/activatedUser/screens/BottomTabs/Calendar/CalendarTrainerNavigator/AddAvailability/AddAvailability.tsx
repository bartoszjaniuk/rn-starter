import * as React from 'react';

import { Stack } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';

import { Control, Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { goBack } from 'src/navigation';
import { Screen } from 'src/screen';
import { PressableScale, SelectDropdown, Text, TextInput } from 'src/shared';

const availabilityFormSchema = z.object({
  title: z.string().min(1, 'Pole jest wymagane'),
  start: z.string().min(1, 'Pole jest wymagane'),
  end: z.string().min(1, 'Pole jest wymagane'),
  duration: z.string().min(1, 'Pole jest wymagane'),
  repetition: z.string().min(1, 'Pole jest wymagane').trim(),
});

type AvailabilityFormFieldValues = z.infer<typeof availabilityFormSchema>;

type Props = {
  control: Control<AvailabilityFormFieldValues>;
};

const Form = (props: Props) => {
  const { control } = props;

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
          <SelectDropdown
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
              { label: 'Codziennie', value: 'everyday' },
              { label: 'Co tydzień', value: 'week' },
              { label: 'Co 2 tygodnie', value: 'two-weeks' },
              { label: 'Co 1 miesiąc', value: 'month' },
            ]}
          />
        )}
        name="repetition"
      />
    </Stack>
  );
};

const Content = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AvailabilityFormFieldValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      title: '',
      start: '',
      end: '',
      duration: '',
      repetition: 'never',
    },
  });

  return (
    <Screen.Content>
      <Form control={control} />
    </Screen.Content>
  );
};

export const CalendarTrainerAddAvailability = () => {
  return (
    <Screen
      backgroundColor="black"
      HeaderComponent={
        <Screen.Header title="Dodaj dostępność" variant="primary">
          <Screen.Header.Right>
            <PressableScale onPress={() => null}>
              <Text fontWeight="700" size="xs" color="white">
                Dodaj
              </Text>
            </PressableScale>
          </Screen.Header.Right>
          <Screen.Header.Left>
            <PressableScale onPress={goBack}>
              <Text fontWeight="700" size="xs" color="error">
                Anuluj
              </Text>
            </PressableScale>
          </Screen.Header.Left>
        </Screen.Header>
      }
      statusBarStyle="light"
    >
      <Content />
    </Screen>
  );
};
