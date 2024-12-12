import { Inline, Stack } from '@grapp/stacks';

import { Control, Controller } from 'react-hook-form';
import * as z from 'zod';

import { TextInput } from 'src/shared';

export const bodyMetricsFormSchema = z.object({
  height: z
    .number({
      invalid_type_error: 'Wartość musi być liczbą',
    })
    .min(1, 'Wartość nie może być mniejsza niż 1')
    .max(300, 'Wartość nie może być większa niż 300'),
  weight: z
    .number({
      invalid_type_error: 'Wartość musi być liczbą',
    })
    .min(1, 'Wartość nie może być mniejsza niż 1')
    .max(300, 'Wartość nie może być większa niż 300'),
  chest: z
    .number({
      invalid_type_error: 'Wartość musi być liczbą',
    })
    .min(1, 'Wartość nie może być mniejsza niż 1')
    .max(300, 'Wartość nie może być większa niż 300'),
  biceps: z
    .number({
      invalid_type_error: 'Wartość musi być liczbą',
    })
    .min(1, 'Wartość nie może być mniejsza niż 1')
    .max(300, 'Wartość nie może być większa niż 300'),
  waist: z
    .number({
      invalid_type_error: 'Wartość musi być liczbą',
    })
    .min(1, 'Wartość nie może być mniejsza niż 1')
    .max(300, 'Wartość nie może być większa niż 300'),
  hip: z
    .number({
      invalid_type_error: 'Wartość musi być liczbą',
    })
    .min(1, 'Wartość nie może być mniejsza niż 1')
    .max(300, 'Wartość nie może być większa niż 300'),
  thigh: z
    .number({
      invalid_type_error: 'Wartość musi być liczbą',
    })
    .min(1, 'Wartość nie może być mniejsza niż 1')
    .max(300, 'Wartość nie może być większa niż 300'),
  calf: z
    .number({
      invalid_type_error: 'Wartość musi być liczbą',
    })
    .min(1, 'Wartość nie może być mniejsza niż 1')
    .max(300, 'Wartość nie może być większa niż 300'),
  measurementDate: z.string(),
});

export type BodyMetricsFormFieldValues = z.infer<typeof bodyMetricsFormSchema>;

export type Props = {
  control: Control<BodyMetricsFormFieldValues>;
};

export const BodyMetricsForm = (props: Props) => {
  const { control } = props;

  return (
    <Stack space={2} paddingTop={6}>
      <Inline space={3}>
        <Controller
          name="height"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              keyboardType="numeric"
              isFullWidth={true}
              onBlur={onBlur}
              onChangeText={(text) => {
                const sanitizedValue = text.replace(/[^0-9]/g, '');
                onChange(sanitizedValue ? parseInt(sanitizedValue, 10) : '');
              }}
              value={value ? value.toString() : ''}
              label="Wzrost (cm)"
              placeholder="Podaj wzrost"
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="weight"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              keyboardType="numeric"
              isFullWidth={true}
              onBlur={onBlur}
              onChangeText={(text) => {
                const sanitizedValue = text.replace(/[^0-9]/g, '');
                onChange(sanitizedValue ? parseInt(sanitizedValue, 10) : '');
              }}
              value={value ? value.toString() : ''}
              label="Waga (kg)"
              placeholder="Podaj wagę"
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
        />
      </Inline>

      <Inline space={3}>
        <Controller
          name="chest"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              keyboardType="numeric"
              isFullWidth={true}
              onBlur={onBlur}
              onChangeText={(text) => {
                const sanitizedValue = text.replace(/[^0-9]/g, '');
                onChange(sanitizedValue ? parseInt(sanitizedValue, 10) : '');
              }}
              value={value ? value.toString() : ''}
              label="Klatka (cm)"
              placeholder="Podaj wymiar klatki"
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="biceps"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              keyboardType="numeric"
              isFullWidth={true}
              onBlur={onBlur}
              onChangeText={(text) => {
                const sanitizedValue = text.replace(/[^0-9]/g, '');
                onChange(sanitizedValue ? parseInt(sanitizedValue, 10) : '');
              }}
              value={value ? value.toString() : ''}
              label="Biceps (cm)"
              placeholder="Podaj wymiar bicepsu"
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
        />
      </Inline>

      <Inline space={3}>
        <Controller
          name="waist"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              keyboardType="numeric"
              isFullWidth={true}
              onBlur={onBlur}
              onChangeText={(text) => {
                const sanitizedValue = text.replace(/[^0-9]/g, '');
                onChange(sanitizedValue ? parseInt(sanitizedValue, 10) : '');
              }}
              value={value ? value.toString() : ''}
              label="Talia (cm)"
              placeholder="Podaj wymiar tali"
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="hip"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              keyboardType="numeric"
              isFullWidth={true}
              onBlur={onBlur}
              onChangeText={(text) => {
                const sanitizedValue = text.replace(/[^0-9]/g, '');
                onChange(sanitizedValue ? parseInt(sanitizedValue, 10) : '');
              }}
              value={value ? value.toString() : ''}
              label="Biodra (cm)"
              placeholder="Podaj wymiar bioder"
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
        />
      </Inline>

      <Inline space={3}>
        <Controller
          name="thigh"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              keyboardType="numeric"
              isFullWidth={true}
              onBlur={onBlur}
              onChangeText={(text) => {
                const sanitizedValue = text.replace(/[^0-9]/g, '');
                onChange(sanitizedValue ? parseInt(sanitizedValue, 10) : '');
              }}
              value={value ? value.toString() : ''}
              label="Udo (cm)"
              placeholder="Podaj wymiar uda"
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="calf"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              keyboardType="numeric"
              isFullWidth={true}
              onBlur={onBlur}
              onChangeText={(text) => {
                const sanitizedValue = text.replace(/[^0-9]/g, '');
                onChange(sanitizedValue ? parseInt(sanitizedValue, 10) : '');
              }}
              value={value ? value.toString() : ''}
              label="Łydka (cm)"
              placeholder="Podaj wymiar łydki"
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
        />
      </Inline>
    </Stack>
  );
};
