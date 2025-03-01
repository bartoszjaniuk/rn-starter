import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { BodyMetrics, useTraineeBodyMetricsMutation, useTraineeBodyMetricsQuery } from 'src/api/trainee';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goBack } from 'src/navigation';
import { useAuth } from 'src/providers/AuthContext';
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
    watch,
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

  const [canBeUpdated, setCanBeUpdated] = React.useState(false);

  const checkIfCanBeUpdated = React.useCallback(() => {
    if (!traineeBodyMetrics) return true;
    const values = getValues();
    return Object.keys(values).some(
      (key) =>
        values[key as keyof typeof traineeBodyMetrics] !== traineeBodyMetrics[key as keyof typeof traineeBodyMetrics],
    );
  }, [traineeBodyMetrics, getValues]);

  React.useEffect(() => {
    const subscription = watch(() => {
      setCanBeUpdated(checkIfCanBeUpdated());
    });
    return () => subscription.unsubscribe();
  }, [watch, checkIfCanBeUpdated]);

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
          <PressableScale isDisabled={!canBeUpdated} onPress={onSubmit}>
            <Text fontWeight="700" size="xs" color={!canBeUpdated ? 'disabled' : 'primary'}>
              Aktualizuj
            </Text>
          </PressableScale>
        </Screen.Header.Right>
      ),
    },
    [handleSubmit, traineeBodyMetricsMutation.mutate, isValid, canBeUpdated],
  );

  return (
    <Screen.Content>
      <BodyMetricsForm control={control} />
    </Screen.Content>
  );
};

export const HomeUpdateParameters = () => {
  const auth = useAuth();
  const traineeBodyMetricsQuery = useTraineeBodyMetricsQuery(auth.user?.traineeId || '');

  const traineeBodyMetrics =
    traineeBodyMetricsQuery.data?.data && traineeBodyMetricsQuery.data.data.length > 0
      ? traineeBodyMetricsQuery.data?.data[0]
      : undefined;

  return (
    <Screen backgroundColor="black" statusBarStyle="light" HeaderComponent={<Screen.Header variant="primary" />}>
      {traineeBodyMetricsQuery.isLoading ? <LoadingScreen /> : null}

      {!traineeBodyMetricsQuery.isLoading && traineeBodyMetricsQuery.isError ? (
        <TryAgainError queryName="traineeBodyMetrics" onRetry={traineeBodyMetricsQuery.refetch} />
      ) : null}

      {!traineeBodyMetricsQuery.isLoading ? (
        <Content traineeBodyMetrics={traineeBodyMetrics} traineeId={auth.user?.traineeId} />
      ) : null}
    </Screen>
  );
};
