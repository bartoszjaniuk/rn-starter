import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { Control, Controller } from 'react-hook-form';

import { ScheduleEntry, useTrainersQuery } from 'src/api/trainer';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { useRouteParams } from 'src/core/hooks';
import { useNavigator } from 'src/screen';
import { SelectDropdownRN, getQueryStringFromParams } from 'src/shared';

import * as route from '../../../../../navigation/routes';
import { AvailabilityParams } from '../../../Availability';
import { ReservationFormFieldValues } from '../Reservation';
import { getMeetingSlots, mapToSelect } from '../utils/reservation.utils';

type Props = {
  control: Control<ReservationFormFieldValues>;
  availableSlots: string[];
  slots: ScheduleEntry[] | undefined;
  duration: string;
};

export const Form = (props: Props) => {
  const { updateNavigationData } = useNavigator<AvailabilityParams>();
  const { control, availableSlots, slots, duration } = props;
  const { traineeId, trainerId } = useRouteParams(route.toSearchTrainersAvailabilityReservation);
  const queryString = getQueryStringFromParams({ trainerId });
  const trainersQuery = useTrainersQuery(queryString);

  if (trainersQuery.isLoading) return <LoadingScreen />;

  const meetingIntervals = mapToSelect(
    getMeetingSlots(
      slots?.sort((a, b) => a.start.localeCompare(b.start)),
      Number(duration),
    ),
  );

  return (
    <Stack space={2} paddingTop={6}>
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
            label="Czas trwania"
            placeholder="Czas trwania treningu"
            options={[
              { label: '15 minut', value: '15' },
              { label: '30 minut', value: '30' },
              { label: '60 minut', value: '60' },
              { label: '90 minut', value: '90' },
              { label: '120 minut', value: '120' },
            ]}
          />
        )}
        name="duration"
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
                updateNavigationData({ traineeId, availabilitySlotsIds: v.split(',') });
                onChange(v);
              }
            }}
            label="Przedział czasowy"
            placeholder={`Dostępne terminy (${meetingIntervals.length})`}
            options={meetingIntervals.map((meet) => ({
              label: meet.label,
              value: meet.value,
            }))}
          />
        )}
        name="bookingDate"
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
                updateNavigationData({ type: v });

                onChange(v);
              }
            }}
            label="Rodzaj treningu"
            placeholder="Wybierz rodzaj treningu"
            options={trainersQuery.data?.data[0]?.specializations.map((spec) => {
              const key = Object.keys(SPECIALIZATIONS).find(
                (key) => SPECIALIZATIONS[key as keyof typeof SPECIALIZATIONS] === spec,
              );
              return key ? { label: spec, value: key } : { label: spec, value: spec };
            })}
          />
        )}
        name="specialization"
      />
    </Stack>
  );
};

export const SPECIALIZATIONS = {
  YOGA: 'joga',
  STRENGTH_TRAINING: 'trening siłowy',
  CALISTHENICS: 'kalistenika',
  CARDIO: 'kardio',
  PILATES: 'pilates',
  RUNNING: 'biegowy',
} as const;
