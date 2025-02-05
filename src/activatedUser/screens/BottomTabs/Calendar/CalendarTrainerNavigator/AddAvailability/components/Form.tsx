import * as React from 'react';

import { Inline, Stack } from '@grapp/stacks';

import { Control, Controller } from 'react-hook-form';
import * as z from 'zod';

import { useNavigator } from 'src/screen';
import { SelectDropdownRN, TextInput } from 'src/shared';

import { AvailabilityParams } from '../../../Calendar';

const baseHours = [
  { label: '07:00', value: '07:00' },
  { label: '07:15', value: '07:15' },
  { label: '07:30', value: '07:30' },
  { label: '07:45', value: '07:45' },
  { label: '08:00', value: '08:00' },
  { label: '08:15', value: '08:15' },
  { label: '08:30', value: '08:30' },
  { label: '08:45', value: '08:45' },
  { label: '09:00', value: '09:00' },
  { label: '09:15', value: '09:15' },
  { label: '09:30', value: '09:30' },
  { label: '09:45', value: '09:45' },
  { label: '10:00', value: '10:00' },
  { label: '10:15', value: '10:15' },
  { label: '10:30', value: '10:30' },
  { label: '10:45', value: '10:45' },
  { label: '11:00', value: '11:00' },
  { label: '11:15', value: '11:15' },
  { label: '11:30', value: '11:30' },
  { label: '11:45', value: '11:45' },
  { label: '12:00', value: '12:00' },
  { label: '12:15', value: '12:15' },
  { label: '12:30', value: '12:30' },
  { label: '12:45', value: '12:45' },
  { label: '13:00', value: '13:00' },
  { label: '13:15', value: '13:15' },
  { label: '13:30', value: '13:30' },
  { label: '13:45', value: '13:45' },
  { label: '14:00', value: '14:00' },
  { label: '14:15', value: '14:15' },
  { label: '14:30', value: '14:30' },
  { label: '14:45', value: '14:45' },
  { label: '15:00', value: '15:00' },
  { label: '15:15', value: '15:15' },
  { label: '15:30', value: '15:30' },
  { label: '15:45', value: '15:45' },
  { label: '16:00', value: '16:00' },
  { label: '16:15', value: '16:15' },
  { label: '16:30', value: '16:30' },
  { label: '16:45', value: '16:45' },
  { label: '17:00', value: '17:00' },
  { label: '17:15', value: '17:15' },
  { label: '17:30', value: '17:30' },
  { label: '17:45', value: '17:45' },
  { label: '18:00', value: '18:00' },
  { label: '18:15', value: '18:15' },
  { label: '18:30', value: '18:30' },
  { label: '18:45', value: '18:45' },
  { label: '19:00', value: '19:00' },
  { label: '19:15', value: '19:15' },
  { label: '19:30', value: '19:30' },
  { label: '19:45', value: '19:45' },
  { label: '20:00', value: '20:00' },
  { label: '20:15', value: '20:15' },
  { label: '20:30', value: '20:30' },
  { label: '20:45', value: '20:45' },
  { label: '21:00', value: '21:00' },
  { label: '21:15', value: '21:15' },
  { label: '21:30', value: '21:30' },
  { label: '21:45', value: '21:45' },
  { label: '22:00', value: '22:00' },
];

export const availabilityFormSchema = z.object({
  title: z.string().min(1, 'Pole jest wymagane'),
  date: z.string().min(1, 'Pole jest wymagane'),
  start: z.string().min(1, 'Pole jest wymagane'),
  end: z.string().min(1, 'Pole jest wymagane'),
  recurrence: z.string().min(1, 'Pole jest wymagane').trim(),
});

export type AvailabilityFormFieldValues = z.infer<typeof availabilityFormSchema>;

type Props = {
  control: Control<AvailabilityFormFieldValues>;
  availableSlots: string[];
  startHour: string;
  endHour: string;
};

export const Form = (props: Props) => {
  const { control, availableSlots, startHour } = props;

  const { updateNavigationData } = useNavigator<AvailabilityParams>();
  const startHours = React.useMemo(() => baseHours.filter((h) => h.value), []);
  const endHours = React.useMemo(() => baseHours.filter((h) => h.value > startHour), [startHour]);

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
                if (v === null) return onChange('');
                return onChange(v);
              }}
              label="Godzina od"
              placeholder="Podaj godzine"
              options={startHours}
            />
          )}
          name="start"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <SelectDropdownRN
              isRequired={true}
              error={error}
              selectedValue={value}
              onValueChange={(v: string | null) => {
                if (v === null) return onChange('');
                return onChange(v);
              }}
              label="Godzina do"
              placeholder="Podaj godzine"
              options={endHours}
            />
          )}
          name="end"
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
        name="recurrence"
      />
    </Stack>
  );
};
