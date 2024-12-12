import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { BodyMetrics, useTraineeBodyMetricsMutation, useTraineeBodyMetricsQuery } from 'src/api/trainee';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goBack } from 'src/navigation';
import { Screen } from 'src/screen';
import { PressableScale, Text, TryAgainError } from 'src/shared';

import { BodyMetricsForm, BodyMetricsFormFieldValues, bodyMetricsFormSchema } from './components/BodyMetricsForm';

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
      <BodyMetricsForm control={control} />
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
      {userInfoQuery.isLoading || traineeBodyMetricsQuery.isLoading ? <LoadingScreen /> : null}
      {!userInfoQuery.isLoading && userInfoQuery.isError ? (
        <TryAgainError queryName="userInfo" onRetry={userInfoQuery.refetch} />
      ) : null}

      {!traineeBodyMetricsQuery.isLoading && traineeBodyMetricsQuery.isError ? (
        <TryAgainError queryName="traineeBodyMetrics" onRetry={traineeBodyMetricsQuery.refetch} />
      ) : null}

      {!userInfoQuery.isLoading && !traineeBodyMetricsQuery.isLoading ? (
        <Content traineeBodyMetrics={traineeBodyMetrics} traineeId={userInfoQuery.data?.traineeId} />
      ) : null}
    </Screen>
  );
};
