import * as React from 'react';

import { Inline, Stack } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';

import { Control, Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { BodyMetrics, useTraineeBodyMetricsMutation, useTraineeBodyMetricsQuery } from 'src/api/trainee';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goBack } from 'src/navigation';
import { Screen } from 'src/screen';
import { PressableScale, Text, TextInput } from 'src/shared';

const bodyMetricsFormSchema = z.object({
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

type BodyMetricsFormFieldValues = z.infer<typeof bodyMetricsFormSchema>;

type Props = {
  control: Control<BodyMetricsFormFieldValues>;
};

const Form = (props: Props) => {
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

type ContentProps = {
  traineeBodyMetrics: BodyMetrics | undefined;
  traineeId: string | undefined;
};

const Content = (props: ContentProps) => {
  const { traineeBodyMetrics, traineeId } = props;

  const traineeBodyMetricsMutation = useTraineeBodyMetricsMutation(traineeId || '');

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<BodyMetricsFormFieldValues>({
    resolver: zodResolver(bodyMetricsFormSchema),
    defaultValues: {
      biceps: traineeBodyMetrics?.biceps ?? 0,
      chest: traineeBodyMetrics?.chest ?? 0,
      thigh: traineeBodyMetrics?.thigh ?? 0,
      waist: traineeBodyMetrics?.waist ?? 0,
      weight: traineeBodyMetrics?.weight ?? 0,
      calf: traineeBodyMetrics?.calf ?? 0,
      height: traineeBodyMetrics?.height ?? 0,
      hip: traineeBodyMetrics?.hip ?? 0,
      measurementDate: new Date().toISOString().split('T')[0],
    },
  });

  const checkIfCanBeUpdated = () => {
    if (!traineeBodyMetrics) return true;
    const values = getValues();

    return Object.keys(values).some(
      (key) =>
        values[key as keyof typeof traineeBodyMetrics] !== traineeBodyMetrics[key as keyof typeof traineeBodyMetrics],
    );
  };

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;

    traineeBodyMetricsMutation.mutate({
      biceps: Number(data.biceps),
      chest: Number(data.chest),
      thigh: Number(data.thigh),
      waist: Number(data.waist),
      weight: Number(data.weight),
      calf: Number(data.calf),
      height: Number(data.height),
      hip: Number(data.hip),
      measurementDate: data.measurementDate,
    });
  });

  Screen.useHeader(
    {
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
          <PressableScale isDisabled={!checkIfCanBeUpdated()} onPress={onSubmit}>
            <Text fontWeight="700" size="xs" color={!checkIfCanBeUpdated() ? 'disabled' : 'primary'}>
              Aktualizuj
            </Text>
          </PressableScale>
        </Screen.Header.Right>
      ),
    },
    [handleSubmit, traineeBodyMetricsMutation.mutate, isValid],
  );

  return (
    <Screen.Content>
      <Form control={control} />
    </Screen.Content>
  );
};

export const HomeUpdateParameters = () => {
  const userInfoQuery = useGetUserInfoQuery();
  const traineeBodyMetricsQuery = useTraineeBodyMetricsQuery(userInfoQuery.data?.traineeId || '');

  const traineeBodyMetrics =
    traineeBodyMetricsQuery.data?.data && traineeBodyMetricsQuery.data.data.length > 0
      ? traineeBodyMetricsQuery.data?.data[traineeBodyMetricsQuery.data?.data.length - 1]
      : undefined;

  return (
    <Screen backgroundColor="black" statusBarStyle="light" HeaderComponent={<Screen.Header variant="primary" />}>
      {userInfoQuery.isLoading || traineeBodyMetricsQuery.isLoading ? (
        <LoadingScreen />
      ) : (
        <Content traineeBodyMetrics={traineeBodyMetrics} traineeId={userInfoQuery.data?.traineeId} />
      )}
    </Screen>
  );
};
